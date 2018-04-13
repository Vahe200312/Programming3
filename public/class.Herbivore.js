class Herbivore extends Creature{
    constructor(x, y) {
        super(x,y);
        this.energy = 4;
        this.id;
        this.spreadc = 2;
        this.spmultiply = 1;
        this.bytime = 2;
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
    chooseCell(ch) {
        this.getNewCoords();
        return super.chooseCell(ch);
    }
    move() {
        var cell = random(this.chooseCell(0));
        if (cell) {
            arr[this.y][this.x] = 0;
            this.x = cell[0];
            this.y = cell[1];
            arr[this.y][this.x] = 2;
            this.energy--;
        }
    }

    spread() {
        var newCell = this.chooseCell(0);
        var newCellRand = random(newCell);
        this.spmultiply++;
        if (newCellRand && this.energy > 5 && this.spmultiply % this.bytime == 0) {
            var newx = newCellRand[0];
            var newy = newCellRand[1];
            arr[newy][newx] = 2;
            var newHerb = new Herbivore(newx, newy);
            herbArr.push(newHerb);
            this.energy = 3;
        }
    }
    die() {
        if (this.energy <= 0) {
            arr[this.y][this.x] = 0;
            herbArr.splice(this.id, 1);
            this.energy = 0;
        }

    }
    eat() {
        var ecell = random(this.chooseCell(1));
        if (ecell) {
            arr[this.y][this.x] = 0;
            grassArr.splice(super.getGrassid(ecell[0], ecell[1]), 1);
            this.x = ecell[0];
            this.y = ecell[1];
            arr[ecell[1]][ecell[0]] = 2;
            this.energy++;
            return true;
        }
        else {
            return false;
        }
    }
}