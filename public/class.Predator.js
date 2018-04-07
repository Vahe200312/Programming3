class Predator {
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
        this.id;
        this.energy = 40;
        this.decreaser = 0;
        this.bytime = 3;
    }




    chooseCell(ch) {
        this.getNewCoords();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < arr[0].length && y >= 0 && y < arr.length) {
                if (arr[y][x] == Math.abs(ch)) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    getNewCoords() {
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
    }
    getHerbivoreid(x, y) {
        for (var i = 0; i < herbArr.length; i++) {
            if (herbArr[i].x == x && herbArr[i].y == y)
                return i;
        }
    }
    getOmnivoreid(x,y)
    {
        for(var j = 0; j < omniArr.length; j++)
            if(omniArr[j].x == x && omniArr[j].y == y)
            {
                return j;
            }
    }
    move() {
        var cell = random(this.chooseCell(0));
        if (cell) {
            arr[this.y][this.x] = 0;
            this.x = cell[0];
            this.y = cell[1];
            arr[this.y][this.x] = 3;
        }
    }
    eat() {
        var eatcell = random(this.chooseCell(2));
        var omnieatcell = random(this.chooseCell(4));
        if (eatcell) {
                arr[this.y][this.x] = 0;
                herbArr.splice(this.getHerbivoreid(eatcell[0], eatcell[1]), 1);
                this.x = eatcell[0];
                this.y = eatcell[1];
                arr[eatcell[1]][eatcell[0]] = 3;
                this.energy+=3;
                //console.log("Predator eated");
                return true;
        }
        else if(omnieatcell && Math.floor(Math.random() * 80) > 60)
        {
            arr[this.y][this.x] = 0;
            omniArr.splice(this.getOmnivoreid(omnieatcell[0],omnieatcell[1]),1);
            this.x = omnieatcell[0];
            this.y = omnieatcell[1];
            arr[omnieatcell[1]][omnieatcell[0]] = 3;
            this.energy+=3;
            return true;
        }
        else {
            return false;
        }
    }
    spread() {
        var newCell = this.chooseCell(0);
        var newCellRand = random(newCell);
        this.decreaser++;
        if (newCellRand && this.energy > 50 && this.decreaser >= this.bytime) {
            var newx = newCellRand[0];
            var newy = newCellRand[1];
            arr[newy][newx] = 3;
            var newPred = new Predator(newx, newy);
            predArr.push(newPred);
            this.energy = 20;
            this.decreaser = 0;
        }
    }
    die() {
        if (this.energy <= 0) {
            arr[this.y][this.x] = 0;
            predArr.splice(this.id, 1);
            this.energy = 0;
        }
    }
}