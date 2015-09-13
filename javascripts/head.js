
// Set the players and game
var player1 = new Player("Player 1");
var player2 = new Player("Player 2");
var currentGame = new Game([player1,player2]);

// Array of intersectons and nodes
var nodes=[];
var intersections=[];
var polyarea = [];


function initialize() {
  // Borrowing code from voronoi
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
    center:new google.maps.LatLng(39.328267, -76.611583),
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

            var len = polygons.length
            for(i = 0; i < len; i++ ){
                polygons[i] && polygons.push(polygons[i]);
            }
            polygons.splice(0, len); //take out if necessary
            console.log(polygons);


            for(i = 0; i < polygons.length; i++){
                    if(typeof polygons[i] === "undefined") {}
                    else{
                        polyarea.push(d3.geom.polygon(polygons[i]).area());
                    }
            }

            console.log(polyarea);

            polyarea = polyarea.filter(Number);

            console.log(polyarea);
            var sum = 0;
            for(i = 0; i < polyarea.length; i++){
                if(typeof polyarea[i] === "NaN"){}
                else{
                    sum += polyarea[i];
                }
            }
            console.log(sum);

            svgoverlay.selectAll("path")
              .data(pointdata)
              .attr(pathAttr)
              .enter()
              .append("svg:path")
              .attr("class", "cell")
              .attr(pathAttr)
              .style("fill", "grey")
              .style("fill-opacity", 0.25) //set to 0 to hide
      };


  };
  overlay.setMap(map);
};

/***************************
  * Make the intersections
  ***************************/
  console.log(polyarea);
  var request = new XMLHttpRequest();
  request.open("GET", "baltimore.json", true);
  request.send(null);
  request.onreadystatechange = function() {
  if ( request.readyState === 4 && request.status === 200 ) {
    var my_JSON_object = JSON.parse(request.responseText);

    for (i = 0; i < my_JSON_object.features.length; i++){
    var currentIntersection = new google.maps.Circle({
        center:new google.maps.LatLng(my_JSON_object.features[i].geometry.coordinates[1],my_JSON_object.features[i].geometry.coordinates[0]),
        radius:10,
        strokeColor:"#000000",
        strokeOpacity:0.9,
        strokeWeight:.5,
        fillColor:"#000000",
        fillOpacity:0.4
        });
    currentIntersection.correspondingNode = currentNode;
    var currentNode = new Node(currentGame);
    currentNode.index = i
    //console.log(i);
    intersections.push(currentIntersection);
    nodes.push(currentNode);



    currentIntersection.setMap(map);
    google.maps.event.addListener(intersections[i],'click',function() {
        if (this.correspondingNode.color == 'black') {
          //console.log(this.correspondingNode.game.playerList[0]);
          if (this.correspondingNode.game.whoseTurn == 1) {
            console.log("player1 turn");
            this.setOptions( {
            fillColor: 'red',
            fillOpacity: 1
            });
            player1.ownedNodes.push[this.correspondingNode];
            console.log(player1.ownedNodes);
            this.correspondingNode.game.whoseTurn = 2;
            this.correspondingNode.color = 'red';
            this.correspondingNode.game.playerList[0].addNode(this.correspondingNode);
            console.log(this.correspondingNode.game.playerList[0].ownedNodes);
            //this.correspondingNode.game.playerList[0].update(this.correspondingNode.areaValue);
          } else {
            console.log("player2 turn");
            this.setOptions( {
            fillColor: 'blue',
            fillOpacity: 1
            });
            player2.ownedNodes.push[this.correspondingNode];
            this.correspondingNode.game.whoseTurn = 1;
            this.correspondingNode.color = 'blue';
            this.correspondingNode.game.playerList[1].addNode(this.correspondingNode);
            console.log(this.correspondingNode.game.playerList[1].ownedNodes);
            //this.correspondingNode.game.playerList[1].update(this.correspondingNode.areaValue);
          }
        }
    })

  }
}
}

}


function Player(name) {
  this.name = name;
  this.ownedNodes = [];
  this.points = 0;
}

Player.prototype.addNode = function(Node) {
    this.points += polyarea[Node.index];
    this.ownedNodes.push(Node);
    console.log(this.points);
    document.getElementById(this.name).innerHTML = "Score: " + Math.round(this.points);
}
Player.prototype.update = function(p) {
    this.points += p;

}

function Node(game) {
  this.color = 'black';
  this.game = game;
  this.index = 0;
  this.areaValue = 0;
}

function Game(playerList) {
  this.playerList = playerList;
  this.turnCount = 0;
  // player 1 starts
  this.whoseTurn = 1;
}









google.maps.event.addDomListener(window, 'load', initialize);
