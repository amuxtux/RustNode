RustNode
========

online rust compiler based on node.js

How to Setup
===========
 edit app.js for path of your rustc (if installed properly you dont need -L ../lib )

How to run
===========
install node.js  (nodejs.org for details)

clone repository

node app.js

open localhost:3000 in browser , it should show you text edit page


issues
=========
It is developed on mac system so it should work without any problem on Mac 
however for linux , the node module have to be re-installed. just delete the node_module 
directory contents and reinstall express, now, stylus, ejs , highlight node modules.


Currently syntax highlighting has not been implemented its a todo. welcome any contributions :-)

other big issues is process sandboxing for dangerous code. I am thinking of restricting process.
Ideas are welcome.


Contact Author:
  amitsinghai.jain@gmail.com



