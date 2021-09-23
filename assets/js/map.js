var mapquestAPIKey = "HPByterGQDhFFn4BqKh67908PJoXqDAf";

var locationSearchEl = document.getElementById("location-search")
var searchInput = document.getElementById("search")

locationSearchEl.addEventListener("submit", fetchLocationData)

function fetchLocationData() {    
    var cityName = searchInput.value;
    var searchRadius = 5;
    var numOfResults = 100;
    var requestURL = "https://www.mapquestapi.com/search/v2/radius?origin=" + cityName + "&radius=" + searchRadius + "&maxMatches=" + numOfResults + "&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|541105&outFormat=json&key=" + mapquestAPIKey;

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
            .then(function (data) {
                console.log(data)
                generateMap(data);
            })
    searchInput.value = "";
}

var map;

function generateMap(data) {
    // removes existing map
    if (map != null) {
        map.remove() ;
    } 

    var latOfSearch = data.origin.displayLatLng.lat;
    var lngOfSearch = data.origin.displayLatLng.lng; 
    
    L.mapquest.key = mapquestAPIKey;
    // creates map
    map = L.mapquest.map('map', {
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
    }).bindPopup("<span id=popup>" + data.origin.adminArea5 + "</span>").addTo(map);

    //adds marker for each search result
    var searchResults = data.searchResults;
    for (let i = 0; i < searchResults.length; i++) {
        var popupText = "<span id=popup>" + searchResults[i].name + "</span>" + "<br>" + searchResults[i].fields.address;
        var groceryStoreLat = searchResults[i].fields.disp_lat;
        var groceryStoreLng = searchResults[i].fields.disp_lng;

        L.marker([groceryStoreLat, groceryStoreLng], {
            icon: L.mapquest.icons.marker(),
            draggable: false
        }).bindPopup(popupText).addTo(map);
    }
}