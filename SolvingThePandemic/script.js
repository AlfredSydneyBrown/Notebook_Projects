var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZnJlZGRpZTE2OTciLCJhIjoiY2tqYmhxNGtqMDhkZTJycDJ0Zno4MGM0YiJ9.Okg4q7mlHwmjkm4QDqQKrg'
}).addTo(mymap);

var layerGroup = L.layerGroup().addTo(mymap);
var markerArray = [];

var listOfPolygons = [];

mymap.on('click', function(e) {
    //var poplocation = e.latlng;
    var marker = L.marker([e.latlng.lat, e.latlng.lng]);
    //marker.addTo(layerGroup);
    var coordinates = [e.latlng.lat, e.latlng.lng];
    markerArray.push(coordinates);
    var circleStart = L.circle(markerArray[0], 20, {color: 'blue'}).addTo(mymap);
    drawLine(markerArray);

    if (circleStart.getBounds().contains(markerArray.slice(-1)) && markerArray.length >= 3){
        drawPolygon(markerArray);
        listOfPolygons.push(markerArray.length)
        listOfPolygons.push(markerArray)
        const username = document.getElementById("username");
        const user = username.value;
        localStorage.setItem(user, listOfPolygons)
        markerArray = []
        console.log(listOfPolygons)
    }

});

var coordinate_array = [];

function displayall(){

    for (let i = 0; i < localStorage.length; i++){

        const user = localStorage.key(i)
        const coordinates_string = localStorage.getItem(user);
        
        const coordinate_array_string = coordinates_string.split(",");
        
        
        for (let j = 0; j < coordinate_array_string.length; j++){
            coordinate_array.push(parseFloat(coordinate_array_string[j]));
        }

        console.log(coordinate_array);
    }
}


function removePolygon(marray){
    var polygons = L.polygon(marray, {color: 'blue'}).addTo(mymap);
    polygons.addTo(layerGroup);
};

function drawPolygon(marray){
    var polygon = L.polygon(marray, {color: 'red'}).addTo(mymap);
    polygon.addTo(layerGroup);
    // mymap.fitBounds(polygon.getBounds());
};

function drawLine(marray){
    var polyline = L.polyline(marray, {color: 'red'}).addTo(mymap);
    polyline.addTo(layerGroup);
};

function startpolygons(){
    document.getElementById("mapid").style.zIndex = "10";
    document.getElementById("finish_polygons").style.zIndex = "11";
}

var count = 0;

function addInfo() {
    count += 1;
    if(count % 2){
        document.getElementById("infobox").insertAdjacentHTML("afterend", 
        "<p class='mt-3' id='info1'>The idea of this website is to help mitigate the spread of the coronavirus with everyones help. How you ask? Using polygons! All you need to do is draw polygons over the places where you reside, work, go for walks or hang-out. </p>" +
        "<p class='mt-3'id = 'info2'>Is it safe to share this information? Yes! Firstly, you only give information that you feel comfortable with - if that's your house, flat, or an entire neighbourhood - you only share what you are comfortable with. Secondly, your data is encrypted and anonymous, which makes tracing your polygons back to you virtually impossible. </p>" +
        "<a href='#' class='btn btn-primary' id='info3'>More information</a>" +
        "<a href='#' class='btn btn-primary'id='info4'>See an example</a>"); 
    }else{
        document.getElementById("info1").remove()
        document.getElementById("info2").remove()
        document.getElementById("info3").remove()
        document.getElementById("info4").remove()

    };
};

var count2 = 0
function startlogin() {
    count2 +=1;
    if(count2 == 1){
        document.getElementById("loginentrybtn").insertAdjacentHTML("afterend", 
        "<fieldset class= 'm-3'><input class='m-3' id='username' type='text' placeholder='Enter Username'>" + 
        "<a href='#' id='SubmitUsername' onclick = 'submitUsername()' class='btn btn-primary'>Submit</a></fieldset>"); 
    };

};



function submitUsername(){
    const username = document.getElementById("username");

    const user = username.value;

    startpolygons();
    if (user){
        localStorage.setItem(user, 'empty')
    }
   
};


// simplefeatures