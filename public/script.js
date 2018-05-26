var socket = io();


function setup() {
	createCanvas(900, 900);
	background("grey");
}
var coord_x , coord_y, _side = 11.25;
function mousePressed() {
	coord_x = Math.ceil(mouseX/_side);
	coord_y = Math.ceil(mouseY/_side);
	console.log("X:" + mouseX + " Y:" + mouseY + " x:" + coord_x + " y:" + coord_y);
	creating_data={
		c_x: coord_x,
		c_y: coord_y
	}
	if(coord_x >= 0 && coord_y <= 900 && coord_y >= 0 && coord_y <= 900)
		socket.emit("create", creating_data);
}
 
 
socket.on('sendinfo', function (data) {
	console.log("GOT")
	if (data.curYear == "Spring")
		background("#f7d8d5");
	else if (data.curYear == "Summer")
		background("#fc913aa3");
	else if (data.curYear == "Autumn")
		background("#bf7a1d");
	else if (data.curYear == "Winter")
		background("#b4d9f3");

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
			else if (data.arr[i][j] == 6) {
				fill("#ab2b81");
				rect(j * data.side, i * data.side, data.side, data.side);
			}

		}
});

