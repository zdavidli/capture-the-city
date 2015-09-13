var intersections=[];
function initialize() {

  // Borrowing code from veronoi
  d3.json('baltimore.geojson', function(pointjson){
    makeVoronoi(pointjson);
  });
  var map;

  // ****************
  // Adds voronoi
  // ****************
  function makeVoronoi(pointjson) {
    var width = 1000,
        height = 1000;
    var mapProp = {
    center:new google.maps.LatLng(39.3247148,-76.6239422),
    zoom:15,
    mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

    var overlay = new google.maps.OverlayView();

    overlay.onAdd = function () {

      

      var layer = d3.select(this.getPanes().overlayLayer).append("div").attr("class", "SvgOverlay");
      var svg = layer.append("svg");
      var svgoverlay = svg.append("g").attr("class", "AdminDivisions");
      
      overlay.draw = function () {
            var markerOverlay = this;
            var overlayProjection = markerOverlay.getProjection();
        
            var googleMapProjection = function (coordinates) {
              var googleCoordinates = new google.maps.LatLng(coordinates[1], coordinates[0]);
              var pixelCoordinates = overlayProjection.fromLatLngToDivPixel(googleCoordinates);
              return [pixelCoordinates.x + 4000, pixelCoordinates.y + 4000];
            }

            var pointdata = pointjson.features;
            
            var positions = [];

            pointdata.forEach(function(d) {   
              positions.push(googleMapProjection(d.geometry.coordinates)); 
            });
        
            var polygons = d3.geom.voronoi().clipExtent([0,0],[width,height])(positions);
            
            var pathAttr ={
              "d":function(d, i) { 
                if (typeof polygons[i] === "undefined") {

                } else {
                  return "M" + polygons[i].join("L") + "Z";
              }
              },
              stroke:"red",
              fill:"none"
            };

            svgoverlay.selectAll("path")
              .data(pointdata)
              .attr(pathAttr)
              .enter()
              .append("svg:path")
              .attr("class", "cell")
              .attr(pathAttr)
              .style("fill", "grey")
              .style("fill-opacity", 0.25) //set to 0 to hide
              
            var circleAttr = {
                  "cx":function(d, i) { return positions[i][0]; },
                  "cy":function(d, i) { return positions[i][1]; },
                  "r":3,
                  strokeColor:"#000000",
                  strokeOpacity:0.9,
                  strokeWeight:2,
                  fillColor:"red",
                  fillOpacity:0.4,
                  stroke:"black",
                  fill:"red"      
            }


            /*svgoverlay.selectAll("circle")
              .data(pointdata)
              .attr(circleAttr)
              .enter()
              .append("svg:circle")
              .attr(circleAttr)*/
      
      };

  };

  overlay.setMap(map);


};
  
  var request = new XMLHttpRequest();
  request.open("GET", "baltimore.json", true);
  request.send(null);
  request.onreadystatechange = function() { 
  if ( request.readyState === 4 && request.status === 200 ) {
    var my_JSON_object = JSON.parse(request.responseText);
    
    for (i = 0; i < 503; i++){
    intersections.push(new google.maps.Circle({
      center:new google.maps.LatLng(my_JSON_object.features[i].geometry.coordinates[1],my_JSON_object.features[i].geometry.coordinates[0]),
      radius:5,
      strokeColor:"#000000",
      strokeOpacity:0.9,
      strokeWeight:2,
      fillColor:"#000000",
      fillOpacity:0.4
      }));
    intersections[i].setMap(map);
    console.log(intersections.length);
    console.log(intersections[i]);
    temp = intersections[i];
    google.maps.event.addListener(intersections[i],'click',function() {
       this.setOptions( {
        fillColor: 'white',
        fillOpacity: 1
      });
    })
  }
}
  
  
  


}

}
google.maps.event.addDomListener(window, 'load', initialize);