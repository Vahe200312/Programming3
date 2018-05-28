var socket = io();


function setup() {
	createCanvas(900, 900);
	background("grey");
}

 
 
socket.on('sendinfo', function (data) {
	var eff = 0;
	eff++;
	console.log("GOT")
	if (data.curYear == "Spring")
		background("#f7d8d5");
	else if (data.curYear == "Summer")
		background("#fc913aa3");
	else if (data.curYear == "Autumn")
		background("#bf7a1d");
	else if (data.curYear == "Winter")
		background("#b4d9f3");
	if(eff%2 == 0)
		document.getElementById("weath").textContent = "-"+String(data.curYear)+"-";
	else
		document.getElementById("weath").textContent = " _ "+ String(data.curYear)+" _ ";
	
		document.getElementById("died").textContent = "Humans:" + data.humans;
		document.getElementById("herb").textContent = "Herbivores:" + data.herb;
		document.getElementById("omni").textContent = "Omnivores:" + data.omni;
		document.getElementById("grass").textContent = "Grass:" + data.grass;
		document.getElementById("pred").textContent = "Predators:" + data.pred;
		document.getElementById("anti").textContent = "AntiViruses:" + data.anti;
		
		
		if(data.disaster == "VIRUS EPIDEMY")
			document.getElementById("dis").textContent = data.disaster;
		else
			document.getElementById("dis").textContent = "NO DISASTERS";			
	for (i = 0; i < data.arr.length; i++)
		for (j = 0; j < data.arr[i].length; j++) {
			if (data.arr[i][j] == 1 && data.grassArr.length > 0) {
				fill("green");
				rect(j * data.side, i * data.side, data.side, data.side);
			}
			else if (data.arr[i][j] == 2) {
				fill("yellow");
				rect(j * data.side, i * data.side, data.side, data.side);
			}
			else if(data.arr[i][j] == 2.5)
			{
				fill("#ffff0270");
				rect(j * data.side, i * data.side, data.side, data.side);
			}
			else if (data.arr[i][j] == 3) {
				fill("red");
				rect(j * data.side, i * data.side, data.side, data.side);
			}
			else if (data.arr[i][j] == 3.5) {
				fill("#e97351");
				rect(j * data.side, i * data.side, data.side, data.side);
			}			
			else if (data.arr[i][j] == 4) {
				fill("blue");
				rect(j * data.side, i * data.side, data.side, data.side);
			}
			else if (data.arr[i][j] == 4.5) {
				fill("#00c0fe");
				rect(j * data.side, i * data.side, data.side, data.side);
			}			
			else if (data.arr[i][j] == 5) {
				fill("#ffcd94");
				rect(j * data.side, i * data.side, data.side, data.side);
			}
			else if (data.arr[i][j] == 5.5) {
				fill("black");
				rect(j * data.side, i * data.side, data.side, data.side);
			}			
			else if (data.arr[i][j] == 6) {
				fill("#ab2b81");
				rect(j * data.side, i * data.side, data.side, data.side);
			}
			else if (data.arr[i][j] == 7) {
				fill("#a0d51b");
				rect(j * data.side, i * data.side, data.side, data.side);
			}
		}
});

