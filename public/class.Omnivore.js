class Omnivore {
    constructor(x, y, jbool = false) {
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
        this.energy = 10;
        this.spreaded = false;
        this.spreadtimer = 0;
        this.justborned = jbool;
        this.ptimer = 0;
        this.id;
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
    getGrassid(x, y) {
        for (var i = 0; i < grassArr.length; i++)
            if (grassArr[i].x == x && grassArr[i].y == y)
                return i;
    }
    chooseCell(ch) {//isOK!
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
    move() {
        var cell = random(this.chooseCell(0));
        if (cell) {
            arr[this.y][this.x] = 0;
            this.x = cell[0];
            this.y = cell[1];
            arr[this.y][this.x] = 4;
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
            herbArr.splice(this.getHerbivoreid(newCellHerb[0], newCellHerb[1]), 1);
            this.x = newCellHerb[0];
            this.y = newCellHerb[1];
            arr[newCellHerb[1]][newCellHerb[0]] = 4;
            this.energy++;
            //console.log("Omnivore eated grassEater");
            return true;
        }
        else {
            if (newCellGrass) {
                arr[this.y][this.x] = 0;
                grassArr.splice(this.getGrassid(newCellGrass[0], newCellGrass[1]), 1);
                this.x = newCellGrass[0];
                this.y = newCellGrass[1];
                arr[newCellGrass[1]][newCellGrass[0]] = 4;
                this.energy++;
                //console.log("Omnivore eated");
                return true;
            }
            return false;
        }
    }

    getAnotherOmnivore(x, y) {
        var omnitosp = random(this.chooseCell(4));
        if (omnitosp) {
            x = omnitosp[0];
            y = omnitosp[1];
            for (var i = 0; i < omniArr.length; i++)
            {
                if (omniArr[i].x == x && omniArr[i].y == y)
                {
                    if(omniArr[i].spreaded == false)
                        return i;
                    else 
                        return -1;
                }
            }
                
        }
        else {
            return -1;
        }

    }
    spread() {
        var tarid = this.getAnotherOmnivore();
        var emptycellstospread = random(this.chooseCell(0));
        //console.log(this.id + " " + this.spreaded);
        if (tarid != -1 && this.spreaded == false && this.justborned == false && omniArr.length < 300) {
            if (emptycellstospread) {
                this.spreaded = true;
                omniArr[tarid].spreaded = true;
                var newx = emptycellstospread[0];
                var newy = emptycellstospread[1];
                arr[newy][newx] = 4;
                var newOmni = new Omnivore(newx, newy, true);
                omniArr.push(newOmni);
                return true;
            }
            else
                return false;
        }
        else {
            return false;
        }
    }
    setMaxEn(){
        if(this.energy > 15)
            this.energy = 15;
    }
    backtocanspread()
    {
        if(this.spreaded == true)
        {
            this.spreadtimer++;
            if(this.spreadtimer > 50)
            {
                this.spreaded = false;
            }            
        }
        if(this.justborned == true)
        {
            this.ptimer++;
            if(this.ptimer > 30)
            {
                this.justborned = false;
            }
        }
    }
    die() {
        if (this.energy <= 0) {
            arr[this.y][this.x] = 0;
            omniArr.splice(this.id, 1);
            this.energy = 0;
        }
    }
}
