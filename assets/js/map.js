var mapquestAPIKey = "HPByterGQDhFFn4BqKh67908PJoXqDAf";
var cityName = "philadelphia";
var requestURL = "https://www.mapquestapi.com/search/v2/radius?origin=" + cityName + "&radius=1&maxMatches=10&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|541105&outFormat=json&key=" + mapquestAPIKey;

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
        .then(function (data) {
            console.log(data);
            generateMap(data);
        })

function generateMap(data) {
    L.mapquest.key = mapquestAPIKey;

        var map = L.mapquest.map('map', {
          center: [37.7749, -122.4194],
          layers: L.mapquest.tileLayer('map'),
          zoom: 12
        });
}