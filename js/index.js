

   var intervall;
   let firsttime = true;
let firstime = true;
let isIt = true;
var radii;
   
   window.desktopcheck = function() {
  var check = false;
  if(window.innerWidth >768){
      check=true;
  }
  return check;
}

/// Getting Travelling Distance/////////////////////
var travelDist;
//var map = new L.Map('map', {zoom: 15, center: new L.latLng(data[0].loc) });	//set center from first location
var map = L.map('map').setView([-17.88855, 30.91619], 15);

	 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
     }).addTo(map);	//base layer
   var marker= L.marker([-17, 35]).addTo(map);
    // var  marker = L.marker([0,0], {icon: busIcon}).addTo(map);
    

	var markersLayer = new L.LayerGroup();	//layer contain searched elements
	


//***** Drawing The Geofence Circle******//
var circleOptions = {
   color: 'red',
   fillColor: '#f03',
   fillOpacity: 0.1
}
var circleCenter = [0, 0];
var radius = 50000;
var circle = L.circle(circleCenter, radius, circleOptions);
map.doubleClickZoom.enable(); 
	 
		 circle.addTo(map);
//***** Control Search******//
	var controlSearch = new L.Control.Search
	({
		position:'topright',		
		layer: markersLayer,
		initial: false,
		zoom: 15,
		marker: false
	});
console.log('Hi');
	map.addControl( controlSearch );
	var xlat,xlng;
	
	
//***** Get coordinates onClick******//
$(document).ready(function() {
 $("#setGeofence").on("click",function() {
map.doubleClickZoom.disable();   
 var elem = document.getElementById("setGeofence");  
  elem.innerHTML = "Open";
radii = document.getElementById('radii').value ;
console.log(radii);
 

map.on('click', function(e) {
  console.log(e.latlng.lat,e.latlng.lng);
 
    map.removeLayer(circle);
	circle = L.circle(e.latlng, {
    color: 'steelblue',
    fillColor: 'steelblue',
    fillOpacity: 0.5,
    radius: radii
  }).addTo(map);
 // distance between the current position of the marker and the center of the circle
    var d = map.distance([-17,35], circle.getLatLng());

    // the marker is inside the circle when the distance is inferior to the radius
    var isInside = d < circle.getRadius();

   // let's manifest this by toggling the color
    circle.setStyle({
        fillColor: isInside ? 'green' : '#f03'
    })
	var elem = document.getElementById("statusLabel");
	if(isInside)
	{
		      elem.innerHTML = " <i class='fa-solid fa-thumbs-up mt-4' style='color: green'> All Good</i>";
	}
	else
	{
		
		   elem.innerHTML = "<i id='statusLabel' class='fas fa-triangle-exclamation fa-fade mt-4' style='color: red'> Out of Bounce</i> ";
	}
});
 });
 });



function getDatah(){
 
if(window.innerHeight < window.innerWidth && firstime==true && window.desktopcheck() == false ){
    alert("Please use Potrait for a better View!");
    firstime=false;
}

    
      // $.ajax({ 

        // method: "GET", 
        
        // url: "mysql2javascript.php",

      // }).done(function( data ) { 

        // var result= $.parseJSON(data); 
     

        // $.each( result, function( key, value ) { 
            
        
     // var latitude = value['latitude'];
    
         // var longitude = value['longitude'];
       // var dist = value['dist2dest'];
        // var spd = value['speed'];
    // var time = (travelDist /1000) / spd ;
  
  // var timeinmin = time * 60; 
  // var timeinminFxd = timeinmin.toFixed(0);
  

          marker.setLatLng([-17,35]);
	  if(firsttime)
	  {
	  map.setView([-17,35],15);
	  firsttime = false;
	  }
	  var popupstring = 'Cattle A4: ' + "4" + ' minute(s) away';
	  marker.bindPopup(popupstring).openPopup();
         marker.addTo(map); 
	
    
    
      
        // }); 
      // });  
      
}


$(document).ready(function(){

setInterval(getDatah, 2000);
});
