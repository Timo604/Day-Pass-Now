/* a simple Express server for Node.js*/
var express = require("express"),
http = require("http"),
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
var Places = {
    "places":[]
}


function requestPlaces(adr){
  var url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?location=' + adr + '&rankby=distance&type=gym&key=AIzaSyDueDNPRDxUx0PR3fC08vmq0VkTP8mkz14';
  $.getJSON(url, function(result){
      console.log(result)
  });
  return result;
}

function requestDetails(places){
    $.each(places, function(i, item){
        var placeID =places[i].place_id 
        console.log(placeID);
        var url = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + placeID + '&fields=name,geometry/location,website&key=AIzaSyDueDNPRDxUx0PR3fC08vmq0VkTP8mkz14'
        })
}