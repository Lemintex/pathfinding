let grid;
let listsOfNodesToMakeWalls = [];
export function generateRecursionMaze(g) {
    grid = g;

    let minX = 1,
        minY = 1;
    let maxX = grid[0].length - 2,
        maxY = grid.length - 2;
    divideChamber(true, minX, maxX, minY, maxY);
    // createBounds();
    console.log(listsOfNodesToMakeWalls);
    return listsOfNodesToMakeWalls;
}

function createBounds() {
    let horizontal = [];
    let vertical = [];
    for (let i = 0; i < grid.length; i++) {
        if (i === 0 || i === grid.length - 1) {
            for (let j = 0; j < grid[0].length; j++) {
                // grid[i][j].isWall = true;
                horizontal.push(grid[i][j]);
            }
        } else {
            // grid[i][0].isWall = true;
            vertical.push(grid[i][0]);

            // grid[i][grid[0].length - 1].isWall = true;
            vertical.push(grid[i][grid[0].length - 1]);
        }
    }
    listsOfNodesToMakeWalls.unshift(horizontal);
    listsOfNodesToMakeWalls.unshift(vertical);
}

function divideChamber(horizontal, minX, maxX, minY, maxY) {
    if (horizontal) {
        if (maxX - minX <= 1 || minX === 0 || maxX === grid[0].length - 1) {
            return;
        }
        let y;
        do {
            y = Math.floor(randomNumber(minY, maxY) / 2) * 2;
        } while (y <= 0 || y >= grid.length - 1);

        addHorizontalWall(minX, maxX, y);

        divideChamber(!horizontal, minX, maxX, minY, y - 1);
        divideChamber(!horizontal, minX, maxX, y + 1, maxY);
    } else {
        if (maxY - minY <= 1 || minY === 0 || maxY === grid.length - 1) {
            return;
        }

        let x;
        do {
            x = Math.floor(randomNumber(minX, maxX) / 2) * 2;
        } while (x <= 0 || x >= grid[0].length);
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
        if (hole === i || grid[y][i].isDoorway) {
            grid[y][i].isDoorway = true;
            continue;
        }

        // grid[y][i].isWall = true;
        walls.push(grid[y][i]);
    }
    listsOfNodesToMakeWalls.push(walls);
}

function addVerticalWall(min, max, x) {
    let walls = [];
    let hole = Math.floor(randomNumber(min, max) / 2) * 2 + 1;
    for (let i = min; i <= max; i++) {
        if (hole === i || grid[i][x].isDoorway) {
            grid[i][x].isDoorway = true;
            continue;
        }

        // grid[i][x].isWall = true;
        walls.push(grid[i][x]);
    }
    listsOfNodesToMakeWalls.push(walls);
}
