/* a simple Express server for Node.js*/
var express = require("express"),
http = require("http"),
appTest;


// create our server - listen on port 3030
appTest = express();
http.createServer(appTest).listen(3030);

//set up static file directory - default route for server
console.log(__dirname)
appTest.use(express.static(C:\Users\tlutz\Documents\GitHub\Day-Pass-Now\index.html));

// set up routes
appTest.get("/", function(req, res) {
    res.send("welcome to day pass now server.");
    });
appTest.get("/test", function(req, res) {
res.send("welcome to the day pass now server.");
});