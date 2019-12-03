function findGyms(){ 
    "use strict";
 
 //reference to gymOutputs in DOM
 let gymOutput = document.querySelector('.gym-output');
 //find gyms button
 let findGymBtn = document.getElementById("find");
 
 let locationInput = document.getElementById("ls");
 
 let currentLocBtn = document.getElementById("cl");

 //variables for google APIs
 var geocoder;
 var map;
 var location;


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
 findGymBtn.addEventListener('click', () => {
    console.log('find button clicked');
    var radius = document.getElementById("dis").value * 1609.34 //approximate miles to meters conversion
    var loc = codeAddress({'address':locationInput.value});
    var places = requestPlaces(adr);
    var details = requestDetails(places);
    displayGyms(locationInput.value, document.getElementById("dis").value, gymOutput);
 })

 function codeAddress(adr){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode(adr, function(results, status) {
        if(status == 'OK'){
            location = results[0].geometry.location;
            console.log("location created... " + location);
            return location;
        }
        else{
            alert('Geocode was not successful because: ' + status);
        }
    });
}
 
 
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
 }
 
 function displayGyms(gymName, distance, output){
     clearGyms(output);
     //create p node
     let p = document.createElement('p');
     //text is the location input value
     let locationText = document.createTextNode("Gyms within " + 
         distance + " of " +gymName);
     //append the location text
     p.appendChild(locationText);
     output.appendChild(p);
 }
 
 function clearGyms(output){
     let gyms = output.querySelectorAll('p')
     for(let gym of gyms)
     {
         gym.remove();
     }
     console.log("gyms cleared");
 }

 function initMap(){
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
 }

 

 //on start-up
 findGyms();