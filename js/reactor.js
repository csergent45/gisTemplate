﻿
////////// AUTHOR & APPLICATION INFORMATION ////////////////////////////////////////
//
//   Author: Chris Sergent
//   Date:   December 31, 2014
//   Application: GIS Template
//   Page: simpleMap.html
//
////////////////////////////////////////////////////////////////////////////////////


// Get references to modules to be used
require(["esri/map",
         "esri/layers/ArcGISDynamicMapServiceLayer",
         "dojo/domReady!"], 
         // Set variables to be used with references (write variables and references in the same order and be careful of typos on your references)
         function (Map, ArcGISDynamicMapServiceLayer) {

    //-----------------------------------------------------------
    // Map Services Begin
    //-----------------------------------------------------------

    // Esri Imagery
    var map = new Map("mapSection", {
        basemap: 'satellite',
        center:[-88.951, 39.861],
        zoom:12
    });

    // Operation Map Service
    var operationalLayer = new ArcGISDynamicMapServiceLayer("http://maps.decaturil.gov/arcgis/rest/services/Public/InternetVector/MapServer", { "opacity": 0.5 });
    map.addLayer(operationalLayer);

    //-----------------------------------------------------------
    // Map Services End
    //-----------------------------------------------------------
});