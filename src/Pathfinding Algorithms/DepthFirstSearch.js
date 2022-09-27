export function beginDepthFirstSearch(grid, startNode) {
    var nodesToBeVisited = [];
    let nodesInVisitedOrder = [];
    nodesInVisitedOrder.push(startNode);
    nodesToBeVisited.push(startNode);
    while (nodesToBeVisited.length > 0) {
        let currentNode = nodesToBeVisited.pop();
        currentNode.isVisited = true;
        if (currentNode.isFinish) {
            console.log(currentNode);
            return currentNode;
        }
        let { row, col } = currentNode;
        if (col > 0) {
            let node = grid[row][col - 1];
            visitNode(node, nodesToBeVisited);
        }
        if (row < grid.length - 1) {
            let node = grid[row + 1][col];
            visitNode(node, nodesToBeVisited);
        }
        if (col < grid[0].length - 1) {
            let node = grid[row][col + 1];
            visitNode(node, nodesToBeVisited);
        }
        if (row > 0) {
            let node = grid[row - 1][col];
            visitNode(node, nodesToBeVisited);
        }
    }
}

function visitNode(node, stack) {
    console.log("VISIT");
    if (node.isVisited) return;
    node.isVisited = true;
    stack.push(node);
}
