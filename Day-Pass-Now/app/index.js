

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
 var map;


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
     locationInput.value = 'current location';
 })
 
 //event listener on find gyms button
 findGymBtn.addEventListener('click', async function(){
    console.log('find button clicked');
    var radius = document.getElementById("dis").value * 1609.34 //approximate miles to meters conversion
    //get latitude and longitude object 
    $.post("places", {'adr': locationInput.value, 'rad': String(radius)}, function(response){
    places = response;
    console.log("places posted");
    }).then(displayGyms(places));    
    });  


/*function codeAddress(adr){
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
    }*/
  
 
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
 
 
 function displayGyms(p){
    var gymOutput = document.getElementById('gym-output');
     clearGyms(gymOutput);
     $.each(p, ()=>{
        $.post("details", this, function(response){
        detailed = response;
        console.log(detailed);

        //create p node
        let p = document.createElement('p');
        //text is the location input value
        let locationText = document.createTextNode(detailed.name + " is within " + document.getElementById("dis").value +  " of " + locationInput.value);
        //append the location text
        p.appendChild(locationText);
        gymOutput.appendChild(p);
        }); 
     });
    }
     
 
 
 function clearGyms(gymOutput){
     let gyms = gymOutput.querySelectorAll('p')
     for(let gym of gyms)
     {
         gym.remove();
     }
     console.log("gyms cleared");
 }
}

 function initMap(){
    //initializes map and places once the api is loaded -- callback function
    //location of Chicago
    var chicago = {lat: 41.8781, lng: -87.6298};
    //the map, centered on Chicago as default
    map = new google.maps.Map(
        document.getElementById('map'), {
        zoom: 4, 
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
