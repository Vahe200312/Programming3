class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
        this.multiply = 0;
        this.bytime = 3;
    }
    chooseCell(ch) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < arr[0].length && y >= 0 && y < arr.length) {
                if (arr[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    spread() {
        this.multiply++;
        var newCell = this.chooseCell(0);
        var newCellRand = random(newCell);

        if (newCellRand && this.multiply >= this.bytime) {
            var newx = newCellRand[0];
            var newy = newCellRand[1];
            arr[newy][newx] = 1;

            var newGrass = new Grass(newx, newy);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }

}