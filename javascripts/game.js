//document.body.innerHTML = "<table id=\"player_stats\">  <tr id = \"players\">  </tr> <tr id = \"points\"> </tr>   </table>";

player = function (name) {
	this.name = name;
	this.ownedIntersections = [];
	this.points = 0;
	this.getIntersections = function() {return this.ownedIntersections}
	this.addIntersection = function(inter) {
		this.ownedIntersections.push(inter);
	}
}

intersection = function(x,y) {
	this.x = x;
	this.y = y;
	this.owner = null;
	// blue means no owner
	this.color = "blue";
}

game = function(playerList, IntersectionList) {
	this.players = playerList;
	this.allIntersections = IntersectionList;
	this.turnCount = 0;
	this.whoseTurn = 1;
	this.players = playerList.length;

	function turn() {
		if (turnCount % 2 == 0) {
			document.write("Player one your turn");
			this.whoseTurn = 1;

		}
		if (turnCount % 2 == 1) {
			document.write("Player two your turn");
			this.whoseTurn = 2;
		}

	}

	function click(selectedIntersect) {
		if (this.whoseTurn == 1) {
			this.players[0].addIntersection(selectedIntersect);
		}
	}
}

//load all the intersections

clicked = function() {
	//change color

}

// Get intersections from open pass

player1 = new player("mary");
player2 = new player("bob");
table = document.getElementById("player_stats").children[0].children;

for (var i = 0; i < table.length; i++) {
	if (table[i].id == 'players') {
		p1 = table[i].insertCell(0);
		p2 = table[i].insertCell(1);
		p1.innerHTML = player1.name;
		p2.innerHTML = player2.name;
	}
}




