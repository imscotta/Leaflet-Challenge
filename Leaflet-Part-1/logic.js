//Earthquakes

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

// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var geojson;

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
    console.log(data);

    //Circles
    // Loop through the cities array, and create one marker for each city object.
    for (var i = 0; i < data.features.length; i++) {
        console.log(data.features[i]);

        var magnitude = data.features[i].properties.mag;
        var radiusWidth = magnitude * 5000;
        var color = "";
        if (magnitude > 5) {
            color = "#4B0082";
        }
        if (magnitude > 4) {
            color = "#663399";
        }
        if (magnitude > 3) {
            color = "#7B68EE";
        }
        if (magnitude > 2) {
            color = "#BA55D3";
        }
        if (magnitude > 1) {
            color = "#DA70D6";
        }
        if (magnitude > 0) {
            color = "#DDA0DD";
        }

        // *  Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. 
        // Earthquakes with higher magnitudes should appear larger, and 
        // earthquakes with greater depth should appear darker in color.

        L.circle([data.features[i].geometry.coordinates[0], data.features[i].geometry.coordinates[1]], {
            fillOpacity: 0.75,
            color: "#ffffff",
            fillColor: color,
            // Setting our circle's radius to equal the output of our markerSize() function:
            // This will make our marker's size proportionate to its population.
            radius: radiusWidth
            }).bindPopup(`<h1>${data.features[i].properties.mag} ${data.features[i].properties.place}</h1> <hr> <h3>${new Date(data.features[i].properties.time)}</h3>`).addTo(myMap);
    }

  // Set up the legend.
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = [5, 4, 3, 2, 1];
    var colors = ["#4B0082", "#663399", "#7B68EE", "#BA55D3", "#DA70D6", "#DDA0DD"];
    var labels = [];

    // Add the minimum and maximum.
    var legendInfo = "<h1>Earthquake Magnitude <br /></h1>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding the legend to the map
  legend.addTo(myMap);




});