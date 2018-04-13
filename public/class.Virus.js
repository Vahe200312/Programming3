class Virus extends Creature{
    constructor(x, y) {
        super(x,y);
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
                    omniArr.splice(super.getOmnivoreid(targets[i][0], targets[i][1]), 1);
                    var newVirus = new Virus(targets[i][0], targets[i][1]);
                    virusArr.push(newVirus);
                    arr[targets[i][1]][targets[i][0]] = 6;         
                }
                else if(arr[targets[i][1]][targets[i][0]] == 3)
                {
                    predArr.splice(super.getPredatorid(targets[i][0], targets[i][1]), 1);
                    var newVirus = new Virus(targets[i][0], targets[i][1]);
                    virusArr.push(newVirus);
                    arr[targets[i][1]][targets[i][0]] = 6;
                }
                else if(arr[targets[i][1]][targets[i][0]] == 2)
                {
                    herbArr.splice(super.getHerbivoreid(targets[i][0],targets[i][1]),1);
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