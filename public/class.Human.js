var Creature = require("./class.Creature.js");
var random = require("./function.random.js");

module.exports = class Human extends Creature{
    constructor(x, y, se) {
        super(x,y);
        this.id;
        this.energy = 30;
        this.preds = 0;
        this.ptimer = 0;
        this.ser  = se;
        this.old = 10;
        this.sp = 5;
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
    chooseCell(ch,ch1,ch2,ch3) {
        this.getNewCoords();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < arr[0].length && y >= 0 && y < arr.length) {
                if (arr[y][x] == ch || arr[y][x] == ch + 0.5
                 || arr[y][x] == ch1 || arr[y][x] == ch1+0.5 || arr[y][x] == ch2 
                ||arr[y][x] == ch2 + 0.5 || arr[y][x] == ch3 || arr[y][x] == ch3+0.5) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
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
    destroy()
    {
        var targets = this.chooseCell(1,2,3,4);
        if(targets)
        {
            for(var i = 0; i < targets.length; i++)
            {
                if(arr[targets[i][1]][targets[i][0]] == 3)
                {
                    this.preds++;   
                    if(this.preds > 2)
                        return false;      
                }
            }
            for(var i = 0; i < targets.length; i++)
            {

                if(arr[targets[i][1]][targets[i][0]] == 1)
                {
                    grassArr.splice(super.getGrassid(targets[i][0],targets[i][1]),1);
                    arr[targets[i][1]][targets[i][0]] = 0;    
                }
                else if(arr[targets[i][1]][targets[i][0]] == 2 || arr[targets[i][1]][targets[i][0]] == 2.5)
                {
                    herbArr.splice(super.getHerbivoreid(targets[i][0],targets[i][1]),1);
                    arr[targets[i][1]][targets[i][0]] = 0;    
                }
                else if(arr[targets[i][1]][targets[i][0]] == 3 || arr[targets[i][1]][targets[i][0]] == 3.5)
                {
                    humanArr.splice(super.getPredatorid(targets[i][0], targets[i][1]), 1);
                    arr[targets[i][1]][targets[i][0]] = 0;    
                }
                else if(arr[targets[i][1]][targets[i][0]] == 4 || arr[targets[i][1]][targets[i][0]] == 4.5)
                {
                    omniArr.splice(super.getOmnivoreid(targets[i][0], targets[i][1]), 1);
                    arr[targets[i][1]][targets[i][0]] = 0;    
                }
            }
            this.energy++;
            return true;
        }
        else
            return false;        
    }
    die(){
        this.old--;
        if(this.energy <= 0 || this.preds > 2 || this.old <=0)
        {
            arr[this.y][this.x] = 0;
            humdied++;
            humanArr.splice(this.id, 1);
            this.energy = 0;            
        }
    }
    spread() {
        if (this.sp > 0) {
            this.sp--;
        }
        if (this.ser == 5)
            var anotherHum = random(this.chooseCell(5.5));
        else
            var anotherHum = random(this.chooseCell(5));
        if (anotherHum) {
            var anotherHum_id = super.getHumanid(anotherHum[0], anotherHum[1]);
            if (Math.floor(Math.random() * (1000 - 0 + 1000)) > 995 && this.sp == 0 && humanArr.length < 300) {
                this.sp = 7;
                var newCell = this.chooseCell(0);
                var newCellRand = random(newCell);
                if (newCellRand && this.energy > 10) {
                    var se = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
                    if (se == 1) {
                        var fi_se = 5;
                    }
                    else {
                        var fi_se = 5.5;
                    }
                    var newx = newCellRand[0];
                    var newy = newCellRand[1];
                    arr[newy][newx] = fi_se;
                    var newHum = new Human(newx, newy, fi_se);
                    humanArr.push(newHum);
                    return true;
                }
                else
                    return false;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }

    }
}
