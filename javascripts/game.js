function Player(name) {
	this.name = name;
	this.ownedNodes = [];
	this.points = 0;
}

Player.prototype.addNode = function(Node) {
	this.ownedNodes.push(Node);
}
	
function PlayerList() {
	this.list = [];
}


function Game(playerList, IntersectionList) {
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
