// x = abscissa, xMax = number of rows
// y = ordinate, yMax = number of columns

const chessGrid = document.querySelector('#chessGrid');

class Square {
    constructor(x, y, xMax, yMax) {
        this.position = [x,y];
        this.left = (() => (x-1 < 1) ? null : [x-1, y])();
        this.right = (() => (x+1 > xMax) ? null : [x+1, y])();
        this.up = (() => (y+1 > yMax) ? null : [x, y+1])();
        this.down = (() => (y-1 < 1) ? null : [x, y-1])();
    }
} 

function createGrid(xMax) {
    const yMax = xMax;
    const grid = [];
    for(let y=1; y<=yMax; y++){
        for(let x=1; x<=xMax; x++) {
            const square = new Square(x, y, xMax, yMax);
            grid.push(square);
        }
    } return grid;
}

class Gameboard {
    constructor(xMax) {
        this.xMax = xMax;
        this.yMax = this.xMax;
        this.board = createGrid(this.xMax);
    }
}

class GameboardRenderer {
    constructor(gameboard) {
        this.gameboard = gameboard;
        this.xMax = gameboard.xMax;
        this.yMax = gameboard.yMax;
    }

    setDataPositionAttribute() {
        Array.from(document.querySelectorAll('.square')).forEach((squareElement, index) => {
            squareElement.setAttribute('data-position', `[${this.gameboard.board[index].position}]`)
        })
    }

    displaySquare(column) {
        const square = document.createElement('div');
        square.classList.add('square');
        column.appendChild(square);
        this.setDataPositionAttribute();
        return square;
    }
    
    displayColumn(columnNumber) {
        const column = document.createElement('div');
        column.classList.add(`column${columnNumber}`, 'column');
        chessGrid.appendChild(column);
        return column;
    }
    
    displayGrid() {
        for(let y=1; y<=this.gameboard.yMax; y++){
            const column = this.displayColumn(y);
            for(let x=1; x<=this.gameboard.xMax; x++) {
                const square = this.displaySquare(column, x, y);
            }
        }
    }
}

class Knight {
    constructor(x, y, xMax, yMax) {
        this._x = x;
        this._y = y;
        this._xMax = xMax;
        this._yMax = yMax;
        this._position = (() => ((x > 0 && x <= xMax && y > 0 && y <= yMax) ? [x,y] : 'outside of the gameboard') )();
    }

    get x() {
        return this._x
    }

    set x(value) {
        if (value > 1 && value <= this._xMax) this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        if (value > 1 && value <= this._yMax) this._y = value;
    }
}

class KnightRenderer {
    constructor(knight) {
        this._knight = knight;
        this._x = knight.x;
        this._y = knight.y;
    }

    get x() {
        return this._x
    }

    set x(value) {
        this.removeOfGameboard();
        this._knight.x = value;
        this._x = value;
        this.displayOnGameBoard();
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this.removeOfGameboard();
        this._knight.y = value;
        this._y = value;
        this.display();
    }

    getDOMelement() {
        return document.querySelector(`[data-position = "[${this.x},${this.y}]"]`);
    }

    displayOnGameBoard() {
        this.getDOMelement().style.backgroundColor = 'blue';
    }

    removeOfGameboard() {
        this.getDOMelement().style.backgroundColor = 'transparent';
    }
}

const gameboard = new Gameboard(8);
const gameboardRenderer = new GameboardRenderer(gameboard)
gameboardRenderer.displayGrid(gameboard);
console.log(gameboard.board);

const knight = new Knight(1,3, gameboard.xMax, gameboard.yMax);
const knightRenderer = new KnightRenderer(knight);
knightRenderer.displayOnGameBoard();
console.log(knight.position);



