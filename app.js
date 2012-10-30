
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

var nowjs = require("now");


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', function(req,res){
    {
      res.render('index', {
                   locals: { title: "online rust compiler", env: JSON.stringify(process.env) }
                });
      
    }
  });



app.listen(process.env.VCAP_APP_PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

var everyone = nowjs.initialize(app);

function execute(){

console.log(__dirname+"/latestFile/a");

var latest = require('child_process').spawn("./latestFile/a");

          latest.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
            var output = 'processoutput=' + data;
            everyone.now.receiveOutput("msg", output);
          });

          latest.stderr.on('data', function (data) {
             console.log('stderr: ' + data);
            var output = 'processoutput=' + data;
            everyone.now.receiveOutput("msg", output);
          });

          latest.on('exit', function (code) {
            console.log('child process exited with code ' + code);
            everyone.now.receiveOutput("msg", "\n ---- execution finished -----");
          });
}


everyone.now.loadCode = function (filename){

   fs = require('fs');
   var code = "";
  fs.readFile(__dirname+"/"+filename, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
  code = data;
});
   
}


everyone.now.saveCode = function (filename, code){

  console.log("file name "+filename + " --code "+code);

  var fs = require('fs');
  var filepath = __dirname+"/"+filename;

  if(code == ""){
    console.log("please write something first....");
  }
  fs.writeFile(filepath, code, function(err) {

        if(err) {
           console.log(err);
           everyone.now.receiveOutput("msg", "something wrong file saving failed"+err);
        } else {
          console.log("The file was saved!");
          everyone.now.receiveOutput("msg", "your code has successfully save on server ");
        } 
      });

}

everyone.now.compileCode = function(message){
  console.log("------- rx code --------");
  console.log(message);	

  var fs = require('fs');
  var filepath = __dirname+"/latestFile/a.rs";
  
  console.log("--- "+filepath);
  fs.writeFile(filepath, message, function(err) {
    
        if(err) {
           console.log(err);
        } else {
          console.log("The file was saved!");

	  var command = "./bin/rustc -L ../lib";
          console.log("command ="+command);
          var terminal = require('child_process').spawn(command, [filepath]);

          terminal.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
            var output = 'compiler output =' + data;
            everyone.now.receiveOutput("msg", output);
          });

          terminal.stderr.on('data', function (data) {
             console.log('stderr: ' + data);
            var output = 'comileroutput =' + data;
            everyone.now.receiveOutput("msg", output);;
          });

          terminal.on('exit', function (code) {
            console.log('child process exited with code ' + code);
            everyone.now.receiveOutput("msg", "\n ---- compiler finished -----");
            execute();
          });

    }
}); 

  everyone.now.receiveOutput("msg", "\n ---- waiting for compiler  ----");
};


/*



*/
