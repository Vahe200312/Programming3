var socket = io();


function setup() {
	createCanvas(900, 900);
	background("grey");
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

