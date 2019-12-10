

function findGyms(){ 
    
    "use strict";
 
 //find gyms button
 let findGymBtn = document.getElementById("find");
 //location searchbar
 let locationInput = document.getElementById("ls");
 //current location
 let currentLocBtn = document.getElementById("cl");

 //variables for google APIs
 var geocoder;
 var location;
 var map, infoWindow;
 var service;
 var autocomplete;
 initMap();
 
 //event listener on location test field to clear on click
 locationInput.addEventListener('click', () => {
     locationInput.value = '';
 })
 
 //event listener on current location button
 currentLocBtn.addEventListener('click', () =>{
     console.log('current locaiton button clicked');
     //set value of locationInput
     alert("Function not available, please type location in search bar.");
 })
 
 //event listener on find gyms button
 findGymBtn.addEventListener('click', async function(){
    console.log('find button clicked');
    //clear the output field from any previous requests
    clearGyms(document.getElementById('gym-output'));
    var radius = parseInt(document.getElementById("dis").value) * 1609.34; //approximate miles to meters conversion
    //get latitude and longitude object 

    
    location = codeAddress(locationInput.value)
    
    location.then(loc =>{
      //new promise to keep chaining the api calls together
      return new Promise(function(resolve){
          //the request to be made for places
        var request = {
          location: loc,
          //want to get the place_id's to use in detailed search later
          radius: radius,
          //bias to searches within the specified distance of the input location
          type: ['gym']
        };
        //initialize new map to be centered on the input location
        map = new google.maps.Map(
          document.getElementById('map'), {
          zoom: 13, 
          center: location,
          fullscreenControl: false,
          streetViewControl: false}); 
      var marker = new google.maps.Marker({position: location, map: map});
          resolve(request);
      }
    );
    
 }).then((request) =>{
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      $.each(results, function(key, value){
        request = {
        placeId : value.place_id,
        fields : ['name', 'formatted_address', 'website', 'geometry', 'permanently_closed']
        };
        service.getDetails(request, (place, status) =>
        {
            if(status = google.maps.places.PlacesServiceStatus.OK)
            {
              console.log(place);
              if(place !== null && !place.permamently_closed){
                displayGym(place);
              }
              
            }
        });
      })
 }});
    

 
});
})

function codeAddress(adr){ 
    console.log("the address is " + adr);
    return new Promise((resolve, reject) => {
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address' : adr}, (results, status) => {
            console.log(status);
            if(status == 'OK'){
                location = results[0].geometry.location;
                console.log("the loc is " + location);
               resolve(location);
            }
            else{
                reject(console.log("something went wrong at geocoder" + status));
            }
        });
    }); 
    }

    
 
 
 function displayGym(p){
    //var gymOutput = document.getElementById('gym-output');
    console.log(p.name);
         //create a node
        var $note = $("<a>");
        //add link
        $note.attr("href", p.website);
        //set content for note
        $note.html(p.name);
        //append note
        $("#gym-output").append($note);
        marker = new google.maps.Marker({position: p.geometry.location, map: map});

 }    
 
 
 function clearGyms(gymOutput){
     let gyms = gymOutput.querySelectorAll('a')
     for(let gym of gyms)
     {
         gym.remove();
     }
     console.log("gyms cleared");
 }





 function initMap(){
    //initializes map and places once the api is loaded -- callback function
    //location of Chicago
    var chicago = {lat: 41.8781, lng: -87.6298};
    //the map, centered on Chicago as default
    map = new google.maps.Map(
        document.getElementById('map'), {
        zoom: 8, 
        center: chicago,
        fullscreenControl: false,
        streetViewControl: false}); 
    var marker = new google.maps.Marker({position: chicago, map: map});
    //add google autocomplete api to locationInput for addresses
    var options = {types: ['address']};
    autocomplete = new google.maps.places.Autocomplete(document.getElementById("ls"), options);
 }
}


 //on start-up
 findGyms();
 



 //event lsitener for enter key
 //currently displays for split second then page refreshes
 /*locationInput.addEventListener('keypress', (e) => {
     //check key pressed by code - 13 - return
     if(e.keyCode === 13)
     {
         console.log("enter pressed");
         displayGyms(locationInput.value, document.getElementById("dis").value, gymOutput);
     }
 })
 */


/*
second attempt at current location functionality. Felt close, but ran out of time to complete
function getCurrentLocation()
{
 if (!navigator.geolocation) {
  return alert('geolocation not supported by your current web browser...');
}

// navigator object - getCurrentPosition accepts success and fail functions
navigator.geolocation.getCurrentPosition( (position) => { 
  console.log(position);
  return new Promise((resolve) =>{ var adr = geocodeLatLng({lat: position.coords.latitude, lng: position.coords.longitude});
  if(adr != undefined)
{
  console.log(adr);
  resolve(adr);
}});
}, () => { // error
  alert('unable to get location...');
});
}


function geocodeLatLng(position) {
  var latlng = position;
  geocoder = new google.maps.Geocoder();
   //initialize infowindow
  infoWindow = new google.maps.InfoWindow;
  return new Promise(function(resolve){
    geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[0]) {
        resolve(results[0].formatted_address);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  
  });})
}

*/
































 /*
    function getCurrentLocation(){
     // Try HTML5 geolocation.
     if (navigator.geolocation) {
         var pos;
          //initialize infowindow
        infoWindow = new google.maps.InfoWindow;
        navigator.geolocation.getCurrentPosition(function(position) {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          infoWindow.open(map);
          map.setCenter(pos);
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } 
      else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
      return geocodeLatLng(pos)
    }
    

    function geocodeLatLng(position) {
        var latlng = position;
        geocoder = new google.maps.Geocoder();
         //initialize infowindow
        infoWindow = new google.maps.InfoWindow;
        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
              return results[0].formatted_address;
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
    }
}*/
