/* a simple Express server for Node.js*/
var express = require("express"),
http = require("http"),
fetch = require('node-fetch'),
appTest;

//adding body-parser for JSON parsing
var bodyParser = require("body-parser");

// create our server - listen on port 3030
appTest = express();
http.createServer(appTest).listen(3030);
//set up static file directory - default route for server
appTest.use(express.static(__dirname + '/app'));
appTest.use(bodyParser.urlencoded({extended: false}));



appTest.post("/places", function(req, res){
    
location = requestLocation(req.adr);
    places = requestPlaces(location, req.rad);
    detailed = requestDetails(places);
    res.json(detailed);
    //console.log(places);
});


