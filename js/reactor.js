



require(["esri/map"], function (Map) {
    var map = new Map("mapDiv", {
        basemap: 'streets',
        center:[-118.2095, 34.0866],
        zoom:10
    });
});