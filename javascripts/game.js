

player = function (name) {
	this.name = name;
	this.ownedIntersections = [];
	this.points = 0;
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
	// player 1 starts
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
		if (this.owner != null)  {return }
		if (this.whoseTurn == 1) {
			selectedInterest.owner = players[0];
			this.players[0].addIntersection(selectedIntersect);
		} else {
			selsectedInterest.owner = players[1];
			this.players[1].addIntersection(selectedIntersect);
		}
		//change color
	}
}




