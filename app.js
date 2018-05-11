var Creature = require("./public/class.Creature.js");
var Grass = require("./public/class.Grass.js");
var Herbivore = require("./public/class.Herbivore.js");
var Omnivore = require("./public/class.Omnivore.js");
var Predator = require("./public/class.Predator.js");
var Virus = require("./public/class.Virus.js");
var Human = require("./public/class.Human.js");

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));

function job() {
	global.timeofyear += 4;
	if (global.timeofyear % 300 == 0) {
		if (global.timeofyear == 1500)
			global.timeofyear = 300;
		if (global.timeofyear % 1200 == 0) {
			global.curYear = "Winter";
		}
		else if (global.timeofyear % 900 == 0) {
			global.curYear = "Autumn";
		}
		else if (global.timeofyear % 600 == 0) {
			global.curYear = "Summer";
		}
		else if (global.timeofyear % 300 == 0) {
			global.curYear = "Spring";
			if (global.virusArr.length == 0) {
				vcount = Math.floor(Math.random() * 3) + 1;
				while (vcount > 0) {
					tx = Math.floor(Math.random() * 80);
					ty = Math.floor(Math.random() * 80);
					if (tx >= 0 && tx < global.arr[0].length && ty >= 0 && ty < global.arr.length) {
						if (global.arr[tx][ty] == 0) {
							virus = new Virus(tx, ty);
							global.virusArr.push(virus);
							vcount--;
						}
					}
				}
			}
		}
	}
	for (i = 0; i < global.grassArr.length; i++) {
		if (global.curYear == "Spring")
			global.grassArr[i].bytime = 3;
		else if (global.curYear == "Summer")
			global.grassArr[i].bytime = 1;
		else if (global.curYear == "Autumn")
			global.grassArr[i].bytime = 4;
		else if (global.curYear == "Winter")
			global.grassArr[i].bytime = 8;
		global.grassArr[i].spread();
	}

	for (i = 0; i < global.herbArr.length; i++) {
		if (global.curYear == "Spring")
			global.herbArr[i].bytime = 1;
		else if (global.curYear == "Summer")
			global.herbArr[i].bytime = 4;
		else if (global.curYear == "Autumn")
			global.herbArr[i].bytime = 2;
		else if (global.curYear == "Winter")
			global.herbArr[i].bytime = 4;
		global.herbArr[i].id = i;
		eatch = global.herbArr[i].eat();
		if (!eatch)
			global.herbArr[i].move();
		global.herbArr[i].spread();
		global.herbArr[i].die();
	}
	var predeatch;
	for (i = 0; i < global.predArr.length; i++) {
		if (global.curYear == "Spring")
			global.predArr[i].bytime = 3;
		else if (global.curYear == "Summer")
			global.predArr[i].bytime = 6;
		else if (global.curYear == "Autumn")
			global.predArr[i].bytime = 3;
		else if (global.curYear == "Winter")
			global.predArr[i].bytime = 4;
		global.predArr[i].id = i;
		predeatch = global.predArr[i].eat();
		if (!predeatch) {
			global.predArr[i].move();
			global.predArr[i].energy--;
		}

		global.predArr[i].spread();
		global.predArr[i].die();
	}

	var omnieatch;
	for (i = 0; i < global.omniArr.length; i++) {
		global.omniArr[i].id = i;
		omnieatch = global.omniArr[i].eat();
		if (!omnieatch) {
			global.omniArr[i].move();
			global.omniArr[i].energy--;
		}
		global.omniArr[i].setMaxEn();
		global.omniArr[i].spread();
		global.omniArr[i].backtocanspread();
		global.omniArr[i].die();
	}

	var destch;
	for (i = 0; i < global.humanArr.length; i++) {
		global.humanArr[i].id = i;
		global.humanArr[i].energy--;
		global.humanArr[i].move();
		global.humanArr[i].spread();
		global.humanArr[i].backtocanspread();
		global.humanArr[i].destroy();
		global.humanArr[i].die();
	}

	for (i = 0; i < global.virusArr.length; i++) {
		global.virusArr[i].id = i;
		global.virusArr[i].deathtimer--;
		global.virusArr[i].move();
		if(global.virusArr[i].infect())
			global.virusArr[i].dissapear();
	}
}


app.use(express.static("."));
app.get('/', function (req, res) {
	res.redirect('public/index.html');
});

server.listen(3000);
var setonce = 0;
io.on('connection', function (socket) {
	if(setonce == 0){
		console.log("Connected!");
		global.side = 11.25;
		global.grassArr = [];
		global.herbArr = [];
		global.predArr = [];
		global.omniArr = [];
		global.humanArr = [];
		global.virusArr = [];
		var herb;
		var gr;
		var pred;
		var omni;
		var human;
		var virus;
		var count = 80, hcount = 80, pcount = 60, ocount = 80, humcount = 8, vcount = 4;
		global.arr = [];
		var tx, ty, tx, ty;
		var eatch;
		var se;
		var fi_se;
		var num = 80;
		global.arr = new Array(num);
		var j = -1;
		for (var i = 0; i < global.arr.length; i++) {
			global.arr[i] = new Array(num);
			for (var j = 0; j < global.arr[i].length; j++)
				global.arr[i][j] = 0;
		}
		while (count > 0) {
			tx = Math.floor(Math.random() * num);
			ty = Math.floor(Math.random() * num);
			if (global.arr[tx][ty] == 0) {
				gr = new Grass(tx, ty);
				global.grassArr.push(gr);
				count--;
			}
		}

		while (hcount > 0) {
			se = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
			tx = Math.floor(Math.random() * num);
			ty = Math.floor(Math.random() * num);
			if (se == 1) {
				var fi_se = 2;
			}
			else {
				var fi_se = 2.5;
			}
			if (tx >= 0 && tx < global.arr[0].length && ty >= 0 && ty < global.arr.length) {
				if (global.arr[tx][ty] == 0) {
					herb = new Herbivore(tx, ty, fi_se);
					global.herbArr.push(herb);
					hcount--;
				}
			}

		}
		while (pcount > 0) {
			se = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
			tx = Math.floor(Math.random() * num);
			ty = Math.floor(Math.random() * num);
			if (se == 1) {
				var fi_se = 3;
			}
			else {
				var fi_se = 3.5;
			}
			if (tx >= 0 && tx < global.arr[0].length && ty >= 0 && ty < global.arr.length) {
				if (global.arr[tx][ty] == 0) {
					pred = new Predator(tx, ty, fi_se);
					global.predArr.push(pred);
					pcount--;
				}
			}
		}
		while (ocount > 0) {
			se = Math.floor(Math.random()) / 2;
			tx = Math.floor(Math.random() * num);
			ty = Math.floor(Math.random() * num);
			if (se == 1) {
				var fi_se = 4;
			}
			else {
				var fi_se = 4.5;
			}
			if (tx >= 0 && tx < global.arr[0].length && ty >= 0 && ty < global.arr.length) {
				if (global.arr[tx][ty] == 0) {
					omni = new Omnivore(tx, ty, fi_se);
					global.omniArr.push(omni);
					ocount--;
				}
			}
		}
		while (humcount > 0) {
			se = Math.floor(Math.random()) / 2;
			tx = Math.floor(Math.random() * num);
			ty = Math.floor(Math.random() * num);
			if (se == 1) {
				var fi_se = 5;
			}
			else {
				var fi_se = 5.5;
			}
			if (tx >= 0 && tx < global.arr[0].length && ty >= 0 && ty < global.arr.length) {
				if (global.arr[tx][ty] == 0) {
					human = new Human(tx, ty, se);
					global.humanArr.push(human);
					humcount--;
				}

			}
		}
		while (vcount > 0) {
			tx = Math.floor(Math.random() * num);
			ty = Math.floor(Math.random() * num);
			if (tx >= 0 && tx < global.arr[0].length && ty >= 0 && ty < global.arr.length) {
				if (global.arr[tx][ty] == 0) {
					virus = new Virus(tx, ty);
					global.virusArr.push(virus);
					vcount--;
				}
			}
		}

		var cellch;
		global.timeofyear = 300;
		global.curYear = "Spring";
		setonce++;
	}

	
	setInterval(function () {
		job();
		var data = {
			arr: global.arr,
			curYear: global.curYear,
			side: global.side,
			grassArr: global.grassArr
		}
		socket.emit("sendinfo", data);
		// console.log("Worked");
	}, 400);
});