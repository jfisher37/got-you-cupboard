var mapquestAPIKey = "HPByterGQDhFFn4BqKh67908PJoXqDAf";
var cityName = "philadelphia";
var requestURL = "https://www.mapquestapi.com/search/v2/radius?origin=" + cityName + "&radius=1&maxMatches=10&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|541105&outFormat=json&key=" + mapquestAPIKey;

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
        .then(function (data) {
            // console.log(data);
            generateMap(data);
        })

function generateMap(data) {
    var latOfSearch = data.origin.displayLatLng.lat;
    var lngOfSearch = data.origin.displayLatLng.lng; 
    
    L.mapquest.key = mapquestAPIKey;
    // creates map
    var map = L.mapquest.map('map', {
        center: [latOfSearch, lngOfSearch],
        layers: L.mapquest.tileLayer('map'),
        zoom: 13
    });
    
    //adds a marker to the map
    L.marker([latOfSearch, lngOfSearch], {
        icon: L.mapquest.icons.marker(),
        draggable: false
    }).bindPopup('Philadelphia').addTo(map);
}