
var side = 11.25;
var grassArr = [];
var herbArr = [];
var predArr = [];
var omniArr = [];
var humanArr = [];
var virusArr = [];
var herb;
var gr;
var pred;
var omni;
var human;
var virus;
var count = 80, hcount = 80, pcount = 60, ocount = 80, humcount = 8, vcount = 4;
var arr = [];
var tx, ty, tx, ty;
var eatch;
function setup() {
	createCanvas(900, 900);
	background("grey");
	var num = 80;
	arr = new Array(num);
	var j = -1;
	for (var i = 0; i < arr.length; i++) {
		arr[i] = new Array(num);
		for (var j = 0; j < arr[i].length; j++)
			arr[i][j] = 0;
	}
	while (count > 0) {
		tx = Math.floor(Math.random() * num);
		ty = Math.floor(Math.random() * num);
		if (arr[tx][ty] == 0) {
			gr = new Grass(tx, ty);
			grassArr.push(gr);
			count--;
		}
	}

	while (hcount > 0) {
		tx = Math.floor(Math.random() * num);
		ty = Math.floor(Math.random() * num);
		if (tx >= 0 && tx < arr[0].length && ty >= 0 && ty < arr.length) {
			if (arr[tx][ty] == 0) {
				herb = new Herbivore(tx, ty);
				herbArr.push(herb);
				hcount--;
			}
		}

	}
	while (pcount > 0) {
		tx = Math.floor(Math.random() * num);
		ty = Math.floor(Math.random() * num);
		if (tx >= 0 && tx < arr[0].length && ty >= 0 && ty < arr.length) {
			if (arr[tx][ty] == 0) {
				pred = new Predator(tx, ty);
				predArr.push(pred);
				pcount--;
			}
		}
	}
	while (ocount > 0) {
		tx = Math.floor(Math.random() * num);
		ty = Math.floor(Math.random() * num);
		if (tx >= 0 && tx < arr[0].length && ty >= 0 && ty < arr.length) {
			if (arr[tx][ty] == 0) {
				omni = new Omnivore(tx, ty);
				omniArr.push(omni);
				ocount--;
			}
		}
	}
	while (humcount > 0) {
		tx = Math.floor(Math.random() * num);
		ty = Math.floor(Math.random() * num);
		if (tx >= 0 && tx < arr[0].length && ty >= 0 && ty < arr.length) {
			if (arr[tx][ty] == 0) {
				human = new Human(tx, ty);
				humanArr.push(human);
				humcount--;
			}

		}
	}
	while (vcount > 0) {
		tx = Math.floor(Math.random() * num);
		ty = Math.floor(Math.random() * num);
		if (tx >= 0 && tx < arr[0].length && ty >= 0 && ty < arr.length) {
			if (arr[tx][ty] == 0) {
				virus = new Virus(tx, ty);
				virusArr.push(virus);
				vcount--;
			}
		}
	}


}
var cellch;
var timeofyear = 300;
var curYear = "Spring";
function draw() {
	frameRate(15);
	if (curYear == "Spring")
		background("#f7d8d5");
	else if (curYear == "Summer")
		background("#fc913aa3");
	else if (curYear == "Autumn")
		background("#bf7a1d");
	else if (curYear == "Winter")
		background("#b4d9f3");
	timeofyear += 4;
	console.log(timeofyear);
	if (timeofyear % 300 == 0) {
		if (timeofyear == 1500)
			timeofyear = 300;
		if (timeofyear % 1200 == 0) {
			curYear = "Winter";
		}
		else if (timeofyear % 900 == 0) {
			curYear = "Autumn";
		}
		else if (timeofyear % 600 == 0) {
			curYear = "Summer";
		}
		else if (timeofyear % 300 == 0) {
			curYear = "Spring";
			if(virusArr.length == 0)
			{
				vcount = Math.floor(Math.random() * 3) + 1;
				while (vcount > 0) {
					tx = Math.floor(Math.random() * 80);
					ty = Math.floor(Math.random() * 80);
					if (tx >= 0 && tx < arr[0].length && ty >= 0 && ty < arr.length) {
						if (arr[tx][ty] == 0) {
							virus = new Virus(tx, ty);
							virusArr.push(virus);
							vcount--;
						}
					}
				}
			}
		}
	}
	for (i = 0; i < grassArr.length; i++) {
		if (curYear == "Spring")
			grassArr[i].bytime = 3;
		else if (curYear == "Summer")
			grassArr[i].bytime = 1;
		else if (curYear == "Autumn")
			grassArr[i].bytime = 4;
		else if (curYear == "Winter")
			grassArr[i].bytime = 8;
		grassArr[i].spread();
	}

	for (i = 0; i < herbArr.length; i++) {
		if (curYear == "Spring")
			herbArr[i].bytime = 1;
		else if (curYear == "Summer")
			herbArr[i].bytime = 4;
		else if (curYear == "Autumn")
			herbArr[i].bytime = 2;
		else if (curYear == "Winter")
			herbArr[i].bytime = 4;
		herbArr[i].id = i;
		eatch = herbArr[i].eat();
		if (!eatch)
			herbArr[i].move();
		herbArr[i].spread();
		herbArr[i].die();
	}
	var predeatch;
	for (i = 0; i < predArr.length; i++) {
		if (curYear == "Spring")
			predArr[i].bytime = 3;
		else if (curYear == "Summer")
			predArr[i].bytime = 6;
		else if (curYear == "Autumn")
			predArr[i].bytime = 3;
		else if (curYear == "Winter")
			predArr[i].bytime = 4;
		predArr[i].id = i;
		predeatch = predArr[i].eat();
		if (!predeatch) {
			predArr[i].move();
			predArr[i].energy--;
		}

		predArr[i].spread();
		predArr[i].die();
	}

	var omnieatch;
	for (i = 0; i < omniArr.length; i++) {
		omniArr[i].id = i;
		omnieatch = omniArr[i].eat();
		if (!omnieatch) {
			omniArr[i].move();
			omniArr[i].energy--;
		}
		omniArr[i].setMaxEn();
		omniArr[i].spread();
		omniArr[i].backtocanspread();
		omniArr[i].die();
	}

	var destch;
	for (i = 0; i < humanArr.length; i++) {
		humanArr[i].id = i;
		humanArr[i].energy--;
		humanArr[i].move();
		humanArr[i].spread();
		humanArr[i].backtocanspread();
		humanArr[i].destroy();
		humanArr[i].die();
	}

	for (i = 0; i < virusArr.length; i++) {
		virusArr[i].id = i;
		virusArr[i].deathtimer--;
		virusArr[i].move();
		virusArr[i].infect();
		virusArr[i].dissapear();
	}

	if (curYear == "Spring")
		background("#f7d8d5");
	else if (curYear == "Summer")
		background("#fc913aa3");
	else if (curYear == "Autumn")
		background("#bf7a1d");
	else if (curYear == "Winter")
		background("#b4d9f3");
	for (i = 0; i < arr.length; i++)
		for (j = 0; j < arr[i].length; j++) {
			if (arr[i][j] == 1 && grassArr.length > 0) {
				fill("green");
				rect(j * side, i * side, side, side);
			}
			else if (arr[i][j] == 2) {
				fill("yellow");
				rect(j * side, i * side, side, side);
			}
			else if (arr[i][j] == 3) {
				fill("red");
				rect(j * side, i * side, side, side);
			}
			else if (arr[i][j] == 4) {
				fill("blue");
				rect(j * side, i * side, side, side);
			}
			else if (arr[i][j] == 5) {
				fill("#ffcd94");
				rect(j * side, i * side, side, side);
			}
			else if (arr[i][j] == 6) {
				fill("#ab2b81");
				rect(j * side, i * side, side, side);
			}

		}
}