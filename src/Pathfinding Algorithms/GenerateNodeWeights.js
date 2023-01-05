let grid;
let nodesToBeVisited = [];

export function generateNodeWeights(g, startNode) {
    grid = g;
    startNode.weight = 0;
    startNode.hasBeenVisited = true;
    nodesToBeVisited.push(startNode);
    while (nodesToBeVisited.length > 0) {
        let currentNode = nodesToBeVisited.shift();

        let neighbours = getNeighboursOfNode(currentNode);
        for (let n of neighbours) {
            visitNode(n, currentNode.weight);
        }
    }
    return grid;
}

// returns nodes adjacent to the argument node
function getNeighboursOfNode(node) {
    let neighbours = [];
    let { row, col } = node;
    if (row > 0) neighbours.push(grid[row - 1][col]);
    if (col > 0) neighbours.push(grid[row][col - 1]);
    if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
    if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
    return neighbours;
}

// visit the node
function visitNode(node, currentNodeWeight) {
    let weight = randomNumber(currentNodeWeight);
    if (node.hasBeenVisited || node.isWall) return;
    node.hasBeenVisited = true;
    node.weight = weight;
    nodesToBeVisited.push(node);
}

// generate a number 0-1 from the argument number
function randomNumber(number) {
    let difference = Math.round(Math.random() * 2) - 1;
    if (number + difference <= 0) return number;
    return number + difference;
}
