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
class Herbivore {
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
    getGrassid(x, y) {
        for (var i = 0; i < grassArr.length; i++)
            if (grassArr[i].x == x && grassArr[i].y == y)
                return i;
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
            grassArr.splice(this.getGrassid(ecell[0], ecell[1]), 1);
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

class Human {
    constructor(x, y,can = false) {
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
        this.energy = 30;
        this.preds = 0;
        this.spreaded = false;
        this.unable = can;
        this.spreadtimer = 0;
        this.ptimer = 0;
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
                if (arr[y][x] == Math.abs(ch) || arr[y][x] == ch1 || arr[y][x] == ch2 || arr[y][x] == ch3) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    getOmnivoreid(x,y)
    {
        for(var j = 0; j < omniArr.length; j++)
            if(omniArr[j].x == x && omniArr[j].y == y)
            {
                return j;
            }
    }
    getHerbivoreid(x,y)
    {
        for(var j = 0; j < herbArr.length; j++)
        {
            if(herbArr[j].x == x && herbArr[j].y == y)
                return j;
        }
    }
    getPredatorid(x,y)
    {
        for(var j = 0; j < predArr.length; j++)
        {
            if(predArr[j].x == x && predArr[j].y == y)
                return j;
        }
    }
    getGrassid(x,y)
    {
        for(var j = 0; j < grassArr.length; j++)
            if(grassArr[j].x == x && grassArr[j].y == y)
                return j;
    }
    move() {
        var cell = random(this.chooseCell(0));
        if (cell) {
            arr[this.y][this.x] = 0;
            this.x = cell[0];
            this.y = cell[1];
            arr[this.y][this.x] = 5;
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
                    grassArr.splice(this.getGrassid(targets[i][0],targets[i][1]),1);
                    arr[targets[i][1]][targets[i][0]] = 0;    
                }
                else if(arr[targets[i][1]][targets[i][0]] == 2)
                {
                    herbArr.splice(this.getHerbivoreid(targets[i][0],targets[i][1]),1);
                    arr[targets[i][1]][targets[i][0]] = 0;    
                }
                else if(arr[targets[i][1]][targets[i][0]] == 3)
                {
                    predArr.splice(this.getPredatorid(targets[i][0], targets[i][1]), 1);
                    arr[targets[i][1]][targets[i][0]] = 0;    
                }
                else if(arr[targets[i][1]][targets[i][0]] == 4)
                {
                    omniArr.splice(this.getOmnivoreid(targets[i][0], targets[i][1]), 1);
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
        if(this.energy <= 0 || this.preds > 2)
        {
            arr[this.y][this.x] = 0;
            humanArr.splice(this.id, 1);
            this.energy = 0;            
        }
    }
    getAnotherHuman(x, y) {
        var Humantosp = random(this.chooseCell(5));
        if (Humantosp) {
            x = Humantosp[0];
            y = Humantosp[1];
            for (var i = 0; i < humanArr.length; i++)
            {
                if (humanArr[i].x == x && humanArr[i].y == y)
                {
                    if(humanArr[i].spreaded == false)
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
        var tarid = this.getAnotherHuman();
        var emptycellstospread = random(this.chooseCell(0));
        if (tarid != -1 && this.spreaded == false && this.unable == false && humanArr.length < 50) {
            if (emptycellstospread) {
                this.spreaded = true;
                humanArr[tarid].spreaded = true;
                var newx = emptycellstospread[0];
                var newy = emptycellstospread[1];
                arr[newy][newx] = 5;
                var newHuman = new Human(newx, newy, true);
                humanArr.push(newHuman);
                return true;
            }
            else
                return false;
        }
        else {
            return false;
        }
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
        if(this.unable == true)
        {
            this.ptimer++;
            if(this.ptimer >= 18)
            {
                this.unable = false;
            }
        }
    }
}

class Virus {
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
        this.deathtimer = 20;
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
    chooseCell(ch,ch1,ch2,ch3) {
        this.getNewCoords();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < arr[0].length && y >= 0 && y < arr.length) {
                if (arr[y][x] == Math.abs(ch) || arr[y][x] == ch1 || arr[y][x] == ch2 || arr[y][x] == ch3) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    getOmnivoreid(x,y)
    {
        for(var j = 0; j < omniArr.length; j++)
            if(omniArr[j].x == x && omniArr[j].y == y)
            {
                return j;
            }
    }
    getHerbivoreid(x,y)
    {
        for(var j = 0; j < herbArr.length; j++)
        {
            if(herbArr[j].x == x && herbArr[j].y == y)
                return j;
        }
    }
    getPredatorid(x,y)
    {
        for(var j = 0; j < predArr.length; j++)
        {
            if(predArr[j].x == x && predArr[j].y == y)
                return j;
        }
    }
    getHumanid(x,y)
    {
        for(var j = 0; j < humanArr.length; j++)
            if(humanArr[j].x == x && humanArr[j].y == y)
                return j;
    }
    infect()
    {
        var targets = this.chooseCell(2,3,4,5);

        if(targets)
        {
            for(var i = 0; i < targets.length; i++)
            {
                if(arr[targets[i][1]][targets[i][0]] == 5)
                {
                    this.humans++;
                    if(this.humans >= 2)
                    {
                        arr[this.y][this.x] = 0;
                        virusArr.splice(this.id, 1);
                        return false;
                    }                    
                }
            }
            this.humans = 0;
            for(var i = 0; i < targets.length; i++)
            {
                if(arr[targets[i][1]][targets[i][0]] == 5)
                {
                    humanArr.splice(this.getHumanid(targets[i][0], targets[i][1]), 1);
                    var newVirus = new Virus(targets[i][0], targets[i][1]);
                    virusArr.push(newVirus);
                    arr[targets[i][1]][targets[i][0]] = 6;    
                }
                else if(arr[targets[i][1]][targets[i][0]] == 4)
                {
                    omniArr.splice(this.getOmnivoreid(targets[i][0], targets[i][1]), 1);
                    var newVirus = new Virus(targets[i][0], targets[i][1]);
                    virusArr.push(newVirus);
                    arr[targets[i][1]][targets[i][0]] = 6;         
                }
                else if(arr[targets[i][1]][targets[i][0]] == 3)
                {
                    predArr.splice(this.getPredatorid(targets[i][0], targets[i][1]), 1);
                    var newVirus = new Virus(targets[i][0], targets[i][1]);
                    virusArr.push(newVirus);
                    arr[targets[i][1]][targets[i][0]] = 6;
                }
                else if(arr[targets[i][1]][targets[i][0]] == 2)
                {
                    herbArr.splice(this.getHerbivoreid(targets[i][0],targets[i][1]),1);
                    var newVirus = new Virus(targets[i][0],targets[i][1]);
                    virusArr.push(newVirus);
                    arr[targets[i][1]][targets[i][0]] = 6;
                }
            }
        }
    }
    move() {
        var cell = random(this.chooseCell(0));
        if (cell) {
            arr[this.y][this.x] = 0;
            this.x = cell[0];
            this.y = cell[1];
            arr[this.y][this.x] = 6;
        }
    }
    dissapear()
    {
        if(this.deathtimer <= 0)
        {
            arr[this.y][this.x] = 0;
            virusArr.splice(this.id, 1);
            return false;            
        }
    }

}