class Grass extends Creature{
    constructor(x, y) {
        super(x,y);
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