var Creature = require("./class.Creature.js");
var random = require("./function.random.js");

module.exports = class Virus extends Creature{
    constructor(x, y) {
        super(x,y);
        this.id;
        this.humans = 0;
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

    infect()
    {
        var targets = this.chooseCell(6);

            for(var i = 0; i < targets.length; i++)
            {
                if(arr[targets[i][1]][targets[i][0]] == 6)
                {
                    virusArr.splice(this.getVirusid(targets[i][0], targets[i][1]), 1);    
                    arr[targets[i][1]][targets[i][0]] = 0;
                }
            }

        return true;
    }
    move() {
        var cell = random(this.chooseCell(0));
        if (cell) {
            arr[this.y][this.x] = 0;
            this.x = cell[0];
            this.y = cell[1];
            arr[this.y][this.x] = 7;
        }
    }

}