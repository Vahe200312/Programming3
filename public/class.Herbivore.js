var Creature = require("./class.Creature.js");
var random = require("./function.random.js");

module.exports = class Herbivore extends Creature{
    constructor(x, y, se) {
        super(x,y);
        this.energy = 4;
        this.id;
        this.spreadc = 2;
        this.spmultiply = 1;
        this.bytime = 2;
        this.ser = se;
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
            if(this.ser == 2)
                arr[this.y][this.x] = 2;
            else if(this.ser == 2.5)
                arr[this.y][this.x] = 2.5;
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
            if(this.ser == 2)
                arr[newy][newx] = 2;
            else if(this.ser == 2.5)
                arr[newy][newx] = 2.5;            
			var se = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
			if (se == 1) {
				var fi_se = 2;
			}
			else {
				var fi_se = 2.5;
			}                
            var newHerb = new Herbivore(newx, newy, fi_se);
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
            if(this.ser == 2)
                arr[ecell[1]][ecell[0]] = 2;
            else if(this.ser == 2.5)
                arr[ecell[1]][ecell[0]] = 2.5;
                            
            this.energy++;
            return true;
        }
        else {
            return false;
        }
    }
}