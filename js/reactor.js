
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
         "esri/config",      // The default values for all JS API configuration options. 

         "esri/Color",  // measurementDiv

         "esri/dijit/HomeButton",     // homeButton
         "esri/dijit/Measurement", // measurementDiv
         "esri/dijit/OverviewMap", // Overview Map
         "esri/dijit/Scalebar",  // Scalebar

         "esri/geometry/Extent",

         "esri/layers/ArcGISDynamicMapServiceLayer",
         "esri/layers/LayerDrawingOptions", // measurementDiv

         "esri/renderers/SimpleRenderer", // measurementDiv

         "esri/SnappingManager", // measurementDiv    -add snapping capability

         "esri/sniff", // measurementDiv

         "esri/symbols/SimpleFillSymbol", // measurementDiv
         "esri/symbols/SimpleLineSymbol", // measurementDiv

         "esri/tasks/GeometryService",

         "dojo/dom",
         "dojo/keys",
         "dojo/on",
         "dojo/parser",

         "dijit/layout/BorderContainer",
         "dijit/layout/ContentPane",
         "dijit/TitlePane",
         "dijit/form/CheckBox",
         "dojo/domReady!"],
         
         // Set variables to be used with references (write variables and references in the same order and be careful of typos on your references)
         function (Map, esriConfig, Color, HomeButton, Measurement, OverviewMap, Scalebar, Extent, ArcGISDynamicMapServiceLayer,
                   LayerDrawingOptions, SimpleRenderer, SnappingManager, has, SimpleFillSymbol, SimpleLineSymbol, GeometryService, dom, keys, on, parser) {

             parser.parse();

             //-----------------------------------------------------------
             // Map Services Begin
             //-----------------------------------------------------------

             // Esri Imagery
             var map = new Map("mapSection", {
                 basemap: 'satellite',
                 center: [-88.951, 39.861],
                 zoom: 12
             });

             // declare geometry service
             esriConfig.defaults.geometryService = new GeometryService("http://maps.decaturil.gov/arcgis/rest/services/Utilities/Geometry/GeometryServer");

             // Operational Map Service
             var operationalLayer = new ArcGISDynamicMapServiceLayer("http://maps.decaturil.gov/arcgis/rest/services/Public/InternetVector/MapServer", { "opacity": 0.5 });
             map.addLayer(operationalLayer);

             //-----------------------------------------------------------
             // Map Services End
             //-----------------------------------------------------------

             // add homeButton Begin
             var home = new HomeButton({
                 map: map,
                 highlightLocation: true,
                 useTracking: false,
                 enableHighAccuracy: true
             }, "homeButton");
             home.startup();
             // add homeButton End


             // overviewMap Begin
             var overviewMapDijit = new OverviewMap({
                 map: map,
                 visible: false
             });
             overviewMapDijit.startup();
             // overviewMap End

             // scalebar Begin
             var scalebar = new Scalebar({
                 map: map,
                 scalebarUnit: "dual"
             });
             // scalebar End


             // start measurement tool - the current layer we are measuring is the operational layer

             // defining the lines that will be drawn for measurement
             var layerDrawingOptions = [];
             var layerDrawingOption = new LayerDrawingOptions();
             var sfs = new SimpleFillSymbol(
                                    "solid",
                                    new SimpleLineSymbol("solid", new Color([195, 176, 23]), 2),
                                    null
                                    );


             layerDrawingOption.renderer = new SimpleRenderer(sfs);

             // change 1 to the layer index that you want to modify:
             layerDrawingOptions[1] = layerDrawingOption;


             //dojo.keys.copyKey maps to CTRL on windows and Cmd on Mac., but has wrong code for Chrome on Mac
             var snapManager = map.enableSnapping({
                 snapKey: has("mac") ? keys.META : keys.CTRL
             });

             // layer used for measuring tool. Your tool wont' show up without it.
             var layerInfos = [{
                 layer: operationalLayer
             }];

             // enables snapping
             snapManager.setLayerInfos(layerInfos);

             // looks for the domID of measurementDiv and starts the measurement tool there
             var measurement = new Measurement({
                 map: map
             }, dom.byId("measurementDiv"));
             measurement.startup();


             // end measurement tool


         });

        