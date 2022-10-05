let nodesToBeVisited = [];
export function generateNodeWeights(grid, startNode) {
    startNode.weight = 0;
    startNode.isVisited = true;
    nodesToBeVisited.push(startNode);
    while (nodesToBeVisited.length > 0) {
        let currentNode = nodesToBeVisited.shift();

        let { row, col } = currentNode;
        grid[row][col] = currentNode;
        if (row > 0) {
            let node = grid[row - 1][col];
            let weight = randomNumber(currentNode.weight);
            visitNode(node, weight);
        }

        if (col < grid[0].length - 1) {
            let node = grid[row][col + 1];
            let weight = randomNumber(currentNode.weight);
            visitNode(node, weight);
        }

        if (row < grid.length - 1) {
            let node = grid[row + 1][col];
            let weight = randomNumber(currentNode.weight);
            visitNode(node, weight);
        }

        if (col > 0) {
            let node = grid[row][col - 1];
            let weight = randomNumber(currentNode.weight);
            visitNode(node, weight);
        }
    }
    return grid;
}

function visitNode(node, weight) {
    if (node.isVisited || node.isWall) return;
    node.isVisited = true;
    node.weight = weight;
    nodesToBeVisited.push(node);
}

function randomNumber(number) {
    let difference = Math.round(Math.random() * 2) - 1;
    if (number + difference <= 0) return number;
    return number + difference;
}
