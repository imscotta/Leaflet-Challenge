//Earthquakes
// Store our API endpoint as queryUrl.
// var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-01-01&endtime=2021-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
    console.log(data);
    // Create our map, giving it the streetmap and earthquakes layers to display on load.
    var myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 5,
        });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

    // Loop through the cities array, and create one marker for each city object.
    for (var i = 0; i < data.features.length; i++) {
        console.log(data.features[i]);
        L.circle([data.features[i].geometry.coordinates[0], data.features[i].geometry.coordinates[1]], {
            fillOpacity: 0.75,
            color: "blue",
            fillColor: "purple",
            // Setting our circle's radius to equal the output of our markerSize() function:
            // This will make our marker's size proportionate to its population.
            radius: 50
            }).bindPopup(`<h1>${data.features[i].properties.mag} ${data.features[i].properties.place}</h1> <hr> <h3>${new Date(data.features[i].properties.time)}</h3>`).addTo(myMap);

    }

});