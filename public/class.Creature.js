
module.exports = class Creature {
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
    getGrassid(x, y) {
        for (var i = 0; i < grassArr.length; i++)
            if (grassArr[i].x == x && grassArr[i].y == y)
                return i;
    }
    getOmnivoreid(x, y) {
        for (var j = 0; j < omniArr.length; j++)
            if (omniArr[j].x == x && omniArr[j].y == y) {
                return j;
            }
    }
    getHerbivoreid(x, y) {
        for (var j = 0; j < herbArr.length; j++) {
            if (herbArr[j].x == x && herbArr[j].y == y)
                return j;
        }
    }
    getPredatorid(x, y) {
        for (var j = 0; j < predArr.length; j++) {
            if (predArr[j].x == x && predArr[j].y == y)
                return j;
        }
    }
    getGrassid(x, y) {
        for (var j = 0; j < grassArr.length; j++)
            if (grassArr[j].x == x && grassArr[j].y == y)
                return j;
    }
    getHumanid(x, y) {
        for (var j = 0; j < humanArr.length; j++)
            if (humanArr[j].x == x && humanArr[j].y == y)
                return j;
    }   
    getVirusid(x, y) {
        for (var j = 0; j < virusArr.length; j++)
            if (virusArr[j].x == x && virusArr[j].y == y)
                return j;
    }     
}