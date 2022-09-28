export function beginBreadthFirstSearch(grid, startNode) {
    var nodesToBeVisited = [];
    let nodesInOrder = [];
    startNode.isVisited = true;
    nodesToBeVisited.push(startNode);
    while (nodesToBeVisited.length > 0) {
        let currentNode = nodesToBeVisited.shift();
        nodesInOrder.push(currentNode);

        let { row, col, isFinish } = currentNode;

        if (isFinish) return nodesInOrder;

        if (row > 0) {
            let node = grid[row - 1][col];
            visitNode(node);
        }

        if (col < grid[0].length - 1) {
            let node = grid[row][col + 1];
            visitNode(node);
        }

        if (row < grid.length - 1) {
            let node = grid[row + 1][col];
            visitNode(node);
        }

        if (col > 0) {
            let node = grid[row][col - 1];
            visitNode(node);
        }
    }

    function visitNode(node) {
        if (node.isVisited || node.isWall) return;
        node.isVisited = true;
        nodesToBeVisited.push(node);
    }
}
