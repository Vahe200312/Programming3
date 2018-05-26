var Creature = require("./class.Creature.js");
var random = require("./function.random.js");

module.exports = class Predator extends Creature {
    constructor(x, y, se) {
        super(x, y);
        this.id;
        this.energy = 40;
        this.decreaser = 0;
        this.bytime = 3;
        this.ser = se;
        this.spreadtimer = 16;
    }




    chooseCell(ch) {
        this.getNewCoords();
        return super.chooseCell(ch);
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
    move() {
        var cell = random(this.chooseCell(0));
        if (cell) {
            arr[this.y][this.x] = 0;
            this.x = cell[0];
            this.y = cell[1];
            arr[this.y][this.x] = this.ser;

        }
    }
    eat() {
        var eatcell = random(this.chooseCell(2));
        var omnieatcell = random(this.chooseCell(4));
        if (eatcell) {
            arr[this.y][this.x] = 0;
            herbArr.splice(super.getHerbivoreid(eatcell[0], eatcell[1]), 1);
            this.x = eatcell[0];
            this.y = eatcell[1];
            arr[eatcell[1]][eatcell[0]] = this.ser;
            this.energy += 3;
            //console.log("Predator eated");
            return true;
        }
        else if (omnieatcell && Math.floor(Math.random() * 80) > 60) {
            arr[this.y][this.x] = 0;
            omniArr.splice(super.getOmnivoreid(omnieatcell[0], omnieatcell[1]), 1);
            this.x = omnieatcell[0];
            this.y = omnieatcell[1];
            arr[omnieatcell[1]][omnieatcell[0]] = this.ser;
            this.energy += 3;
            return true;
        }
        else {
            return false;
        }
    }
    spread() {
        if (this.spreadtimer > 0) {
            this.spreadtimer--;
        }
        if (this.ser == 3)
            var anotherPred = random(this.chooseCell(3.5));
        else
            var anotherPred = random(this.chooseCell(3));
        if (anotherPred) {
            var anotherPred_id = super.getPredatorid(anotherPred[0], anotherPred[1]);
            if (predArr[anotherPred_id].spreadtimer == 0) {
                this.spreadtimer = 16;
                predArr[anotherPred_id].spreadtimer = 16;
                var newCell = this.chooseCell(0);
                var newCellRand = random(newCell);
                if (newCellRand && this.energy > 10) {
                    var se = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
                    if (se == 1) {
                        var fi_se = 3;
                    }
                    else {
                        var fi_se = 3.5;
                    }
                    var newx = newCellRand[0];
                    var newy = newCellRand[1];
                    arr[newy][newx] = this.ser
                    var newPred = new Predator(newx, newy, fi_se);                    
                    predArr.push(newPred);
                    return true;
                }
                else
                    return false;
            }
            else{
                return false;
            }
        }
        else{
            return false;
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