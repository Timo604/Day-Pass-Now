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


var location;
var places = []
var detailed = []

appTest.post("/places", function(req, res){
    
    location = requestLocation(req.adr);
    places = requestPlaces(location, req.rad);
    detailed = requestDetails(places);
    res.json(detailed);
    //console.log(places);
});

//appTest.post("/details", function(req, res){
 //   requestDetails(req);
   // res.json(detailed);
    //console.log("got through details");

//});
function requestDetails(places){
    for(var i = 0; i < places.length(); i++){
        placeID = place.place_id;
        url = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + placeID + '&fields=name,geometry/location,website&key=AIzaSyDueDNPRDxUx0PR3fC08vmq0VkTP8mkz14';
        fetch(url)
            .then(res => detailed.push(res));
    }
    return detailed;
}

function requestPlaces(location, radius){
    url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input='gym'&inputtype='textquery'&fields=place_id&locationbias=circle:" + String(radius) + "@" + location+ "&key=AIzaSyDueDNPRDxUx0PR3fC08vmq0VkTP8mkz14";
    console.log(url);
   fetch(url)
   .then(res => res.json())
   .then(json => console.log(json));
   
}

function requestLocation(adr){
    url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + adr + ",&key=AIzaSyDueDNPRDxUx0PR3fC08vmq0VkTP8mkz14";
    fetch(url)
            .then(res => res.json())
            .then(json=> console.log(json));
}
