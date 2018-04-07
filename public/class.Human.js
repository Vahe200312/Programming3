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
