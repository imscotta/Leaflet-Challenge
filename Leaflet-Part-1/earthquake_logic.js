
//Earthquakes
// Store our API endpoint as queryUrl.
// var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-01-01&endtime=2021-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that describes the place and time of the earthquake.
    function onEachFeature(feature, layer) {
      console.log(feature);
    //   layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);

        // var color = "";
        // if (feature.geometry.coordinates[3] > 100) {
        // color = "yellow";
        // }
        // else if (feature.geometry.coordinates[3] > 50) {
        // color = "blue";
        // }
        // else if (feature.geometry.coordinates[3] > 25) {
        // color = "green";
        // }
        // else {
        // color = "violet";
        // }
      
        var radius = feature.properties.mag * 1000

        L.circle([feature.geometry.coordinates[0], feature.geometry.coordinates[1]], {
        fillOpacity: 0.75,
        color: "blue",
        fillColor: "purple",
        // Setting our circle's radius to equal the output of our markerSize() function:
        // This will make our marker's size proportionate to its population.
        radius: 50
        }).bindPopup(`<h1>${feature.properties.mag} ${feature.properties.place}</h1> <hr> <h3>${new Date(feature.properties.time)}</h3>`);

    }

    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature
    });
  
    // Send our earthquakes layer to the createMap function/
    createMap(earthquakes);
  }
  
function createMap(earthquakes) {

    // Create the base layers.
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })

    var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    // Create a baseMaps object.
    var baseMaps = {
        "Street Map": street,
        "Topographic Map": topo
    };

    // Create an overlay object to hold our overlay.
    var overlayMaps = {
        Earthquakes: earthquakes
    };

    // Create our map, giving it the streetmap and earthquakes layers to display on load.
    var myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 5,
        layers: [street, earthquakes]
        });

    // Import and visualize the data by doing the following: 

    // * Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.

    //     *  Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. 
                //Earthquakes with higher magnitudes should appear larger, and (earthquakes[i].mag)
                // earthquakes with greater depth should appear darker in color. (earthquakes[i].geometry.coordinates[3])

    //     * **Hint:** The depth of the earth can be found as the third coordinate for each earthquake.

    // * Include popups that provide additional information about the earthquake when its associated marker is clicked.

    // // Loop through the cities array, and create one marker for each city object.
    // for (var i = 0; i < earthquakes.length; i++) {

    //     // Conditionals for country gdp_pc
    //     var color = "";
    //     if (earthquakes[i].geometry.coordinates[3] > 100) {
    //     color = "yellow";
    //     }
    //     else if (earthquakes[i].geometry.coordinates[3] > 50) {
    //     color = "blue";
    //     }
    //     else if (earthquakes[i].geometry.coordinates[3] > 25) {
    //     color = "green";
    //     }
    //     else {
    //     color = "violet";
    //     }

    //     L.circle([earthquakes[i].coordinates[0], earthquakes[i].coordinates[1]], {
    //         fillOpacity: 0.75,
    //         color: color,
    //         fillColor: "purple",
    //         // Setting our circle's radius to equal the output of our markerSize() function:
    //         // This will make our marker's size proportionate to its population.
    //         radius: markerSize(earthquakes[i].mag * 100)
    //     }).bindPopup(`<h1>${earthquakes[i].mag} ${earthquakes[i].place}</h1> <hr> <h3>${earthquakes[i].time.toLocaleString()}</h3>`).addTo(myMap);
    // }
    // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

}