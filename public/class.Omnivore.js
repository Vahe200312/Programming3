var Creature = require("./class.Creature.js");
var random = require("./function.random.js");

module.exports = class Omnivore extends Creature {
    constructor(x, y, se, jbool = false) {
        super(x, y);
        this.energy = 10;
        this.spreaded = false;
        this.spreadtimer = 0;
        this.justborned = jbool;
        this.ptimer = 0;
        this.id;
        this.spreadtimer = 16;
        this.ser = se;
        this.old = 30;
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
    chooseCell(ch) {//isOK!
        this.getNewCoords();
        return super.chooseCell(ch);
    }
    move() {
        var cell = random(this.chooseCell(0));
        if (cell) {
            arr[this.y][this.x] = 0;
            this.x = cell[0];
            this.y = cell[1];
            arr[this.y][this.x] = this.ser;
            return true;
        }
        else
            return false;
    }

    eat() {
        var newCellHerb = random(this.chooseCell(2));
        var newCellGrass = random(this.chooseCell(1));
        if (newCellHerb) {
            arr[this.y][this.x] = 0;
            herbArr.splice(super.getHerbivoreid(newCellHerb[0], newCellHerb[1]), 1);
            this.x = newCellHerb[0];
            this.y = newCellHerb[1];
            arr[newCellHerb[1]][newCellHerb[0]] = this.ser;
            this.energy++;
            //console.log("Omnivore eated grassEater");
            return true;
        }
        else {
            if (newCellGrass) {
                arr[this.y][this.x] = 0;
                grassArr.splice(super.getGrassid(newCellGrass[0], newCellGrass[1]), 1);
                this.x = newCellGrass[0];
                this.y = newCellGrass[1];
                arr[newCellGrass[1]][newCellGrass[0]] = this.ser;
                this.energy++;
                //console.log("Omnivore eated");
                return true;
            }
            return false;
        }
    }

    spread() {
        if (this.spreadtimer > 0)
            this.spreadtimer--;
        if (this.ser == 4)
            var anotherOmni = random(this.chooseCell(4.5));
        else
            var anotherOmni = random(this.chooseCell(4));
        if (anotherOmni) {
            var anotherOmni_id = super.getOmnivoreid(anotherOmni[0], anotherOmni[1]);
            if (this.spreadtimer == 0 && omniArr[anotherOmni_id].spreadtimer == 0) {
                var emptycell = random(this.chooseCell(0));
                if (emptycell) {
                    this.spreadtimer = 16;
                    omniArr[anotherOmni_id].spreadtimer = 16;
                    var se = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
                    if (se == 1) {
                        var fi_se = 4;
                    }
                    else {
                        var fi_se = 4.5;
                    }
                    var newx = emptycell[0];
                    var newy = emptycell[1];
                    arr[newy][newx] = fi_se;
                    var newOmni = new Omnivore(newx, newy, fi_se);
                    omniArr.push(newOmni);
                    return true;
                }
                else {
                    return false;
                }
            }
            else
                return false;
        }
        else
            return false;
    }
    setMaxEn() {
        if (this.energy > 15)
            this.energy = 15;
    }
    backtocanspread() {
        if (this.spreaded == true) {
            this.spreadtimer++;
            if (this.spreadtimer > 50) {
                this.spreaded = false;
            }
        }
        if (this.justborned == true) {
            this.ptimer++;
            if (this.ptimer > 30) {
                this.justborned = false;
            }
        }
    }
    die() {
        this.old--;
        if (this.energy <= 0 || this.old <= 0) {
            arr[this.y][this.x] = 0;
            omniArr.splice(this.id, 1);
            this.energy = 0;
        }
    }
}
