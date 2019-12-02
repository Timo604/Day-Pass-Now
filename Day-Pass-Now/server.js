/* a simple Express server for Node.js*/
var express = require("express"),
http = require("http"),
appTest;


// create our server - listen on port 3030
appTest = express();


//set up static file directory - default route for server
appTest.use(express.static(__dirname + '/app'));
http.createServer(appTest).listen(3030);
;