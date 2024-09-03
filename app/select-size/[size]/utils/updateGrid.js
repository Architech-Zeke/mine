export const updateGrid = (grid, gridSize) => {
    const newGrid = grid.map(row => [...row]);

    newGrid.forEach((row, rowIndex) =>
        row.forEach((cell, colIndex) => {
            if (cell === 'm') {
                //把m周圍格子+1
                const neighbors = getNeighbors(rowIndex, colIndex, gridSize);
                neighbors.forEach(([x, y]) => {
                    if (typeof newGrid[x][y] === 'number') {
                        newGrid[x][y] += 1;
                    }
                });
            }
        })
    );

    return newGrid;
};

const getNeighbors = (x, y, gridSize) => {
    //鄰近格子座標
    const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ];

    return directions
        .map(([dx, dy]) => [x + dx, y + dy])
        .filter(
            ([newX, newY]) =>
                newX >= 0 &&
                newX < gridSize &&
                newY >= 0 &&
                newY < gridSize
        );
};