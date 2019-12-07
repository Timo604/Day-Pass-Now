

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
 initMap();


 var data;
 var isSuccessful;
 var places;
 var detailed;

 
 //event listener on location test field to clear on click
 locationInput.addEventListener('click', () => {
     locationInput.value = '';
 })
 
 //event listener on current location button
 currentLocBtn.addEventListener('click', () =>{
     console.log('current locaiton button clicked');
     //set value of locationInput
     locationInput.value = getCurrentLocation();
 })
 
 //event listener on find gyms button
 findGymBtn.addEventListener('click', async function(){
    console.log('find button clicked');
    var radius = parseInt(document.getElementById("dis").value) * 1609.34; //approximate miles to meters conversion
    console.log(radius);
    //get latitude and longitude object 
    location = codeAddress(locationInput.value)
    location.then(loc =>{
      //the request to be made for places
        var request = {
        //look for gyms
        query: 'Gyms',
        //want to get the place_id's to use in detailed search later
        fields: ['place_id'],
        //bias to searches within the specified distance of the input location
        locationBias: {radius: radius, center: loc}};
        service = new google.maps.places.PlacesService(document.getElementById('map'));
        service.findPlaceFromQuery(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          var places = results;
            return places
        }
 });})
      .then((places) => {
        var Places = [];
          $.each(places, function(value){
            var requestD = {
                placeId: value.place_id,
                fields: ['name', 'website', 'formatted_address']
            }
           
            service.getDetails(requestD, function(result, status){
                if(status == google.maps.places.PlacesServiceStatus.OK)
                    Places.push(result);
            })
            })
            if(Places != undefined){
              console.log(Places);
                return Places;
                
            }
        }
      ).then((Places) => displayGyms(Places));
 })


function codeAddress(adr){
    console.log(adr);
    return new Promise((resolve, reject) => {
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address' : adr}, (results, status) => {
            console.log(status);
            if(status == 'OK'){
                location = results[0].geometry.location;
                console.log("the lat is " + location.lat());
               resolve(location);
            }
            else{
                reject(console.log("something went wrong at geocoder" + status));
            }
        });
    }); 
    }

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
          map = new google.maps.Map(
            document.getElementById('map'), {
            zoom: 4, 
            center: {lat: 41.8781, lng: -87.6298},
            fullscreenControl: false,
            streetViewControl: false});
          map.setCenter(pos);
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
      return geocodeLatLng(pos)
    }
    */

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
}
 
 
 function displayGyms(Pl){
    var gymOutput = document.getElementById('gym-output');
    clearGyms(gymOutput);

    $.each(Pl, function(item){
        name = item.name;
        adr = item.formated_address;
        website = item.website;
         //create a node
        let a = document.createElement('a');
        //text is the location input value
        let locationText = document.createTextNode(name + "is nearby at " + adr);
        //append the location text
        a.appendChild(locationText);
        a.setAttribute('href', website)
        gymOutput.appendChild(a);
    })
}
     
 
 
 function clearGyms(gymOutput){
     let gyms = gymOutput.querySelectorAll('p')
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
 })*/
