let grid;
let listsOfNodesToMakeWalls = [];
export function generateRecursionMaze(g) {
    grid = g;

    let minX = 0,
        minY = 0;
    let maxX = grid[0].length - 1,
        maxY = grid.length - 1;
    // createBounds();
    divideChamber(true, minX, maxX, minY, maxY);
    return listsOfNodesToMakeWalls;
}

function createBounds() {
    let horizontal = [];
    let vertical = [];
    for (let i = 0; i < grid.length; i++) {
        if (i === 0 || i === grid.length - 1) {
            for (let j = 0; j < grid[0].length; j++) {
                horizontal.push(grid[i][j]);
            }
        } else {
            vertical.push(grid[i][0]);
            vertical.push(grid[i][grid[0].length - 1]);
        }
    }
    listsOfNodesToMakeWalls.push(horizontal);
    listsOfNodesToMakeWalls.push(vertical);
}

function divideChamber(horizontal, minX, maxX, minY, maxY) {
    if (horizontal) {
        if (maxX - minX <= 1) return;

        let y = Math.floor(randomNumber(minY, maxY) / 2) * 2;

        addHorizontalWall(minX, maxX, y);

        divideChamber(!horizontal, minX, maxX, minY, y - 1);
        divideChamber(!horizontal, minX, maxX, y + 1, maxY);
    } else {
        if (maxY - minY <= 1) return;

        let x = Math.floor(randomNumber(minX, maxX) / 2) * 2;

        addVerticalWall(minY, maxY, x);

        divideChamber(!horizontal, minX, x - 1, minY, maxY);
        divideChamber(!horizontal, x + 1, maxX, minY, maxY);
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function addHorizontalWall(min, max, y) {
    let walls = [];
    let hole = Math.floor(randomNumber(min, max) / 2) * 2 + 1;
    for (let i = min; i <= max; i++) {
        if (hole === i) {
            grid[y][i].isWall = false;
            continue;
        }

        grid[y][i].isWall = true;
        walls.push(grid[y][i]);
    }
    listsOfNodesToMakeWalls.push(walls);
}

function addVerticalWall(min, max, x) {
    let walls = [];
    let hole = Math.floor(randomNumber(min, max) / 2) * 2 + 1;
    for (let i = min; i <= max; i++) {
        if (hole === i) {
            grid[i][x].isWall = false;
            continue;
        }

        grid[i][x].isWall = true;
        walls.push(grid[i][x]);
    }
    listsOfNodesToMakeWalls.push(walls);
}
