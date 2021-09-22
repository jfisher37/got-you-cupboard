var mapquestAPIKey = "HPByterGQDhFFn4BqKh67908PJoXqDAf";
var cityName = "philadelphia";
var searchRadius = 5;
var numOfResults = 100;
var requestURL = "https://www.mapquestapi.com/search/v2/radius?origin=" + cityName + "&radius=" + searchRadius + "&maxMatches=" + numOfResults + "&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|541105&outFormat=json&key=" + mapquestAPIKey;

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
        .then(function (data) {
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
        icon: L.mapquest.icons.marker({ 
            primaryColor: '#22407F', 
            size: 'lg'
        }),
        draggable: false
    }).bindPopup(data.origin.adminArea5).addTo(map);

    //adds marker for each search result
    var searchResults = data.searchResults;
    for (let i = 0; i < searchResults.length; i++) {
        var popupText = searchResults[i].name + " | " + searchResults[i].fields.address;
        var groceryStoreLat = searchResults[i].fields.disp_lat;
        var groceryStoreLng = searchResults[i].fields.disp_lng;

        L.marker([groceryStoreLat, groceryStoreLng], {
            icon: L.mapquest.icons.marker(),
            draggable: false
        }).bindPopup(popupText).addTo(map);
    }
}