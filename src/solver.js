export function solveGrid(grid, words) {
    const directions = [
        { r: 0, c: 1 },   // Horizontal right
        { r: 0, c: -1 },  // Horizontal left
        { r: 1, c: 0 },   // Vertical down
        { r: -1, c: 0 },  // Vertical up
        { r: 1, c: 1 },   // Diagonal down-right
        { r: 1, c: -1 },  // Diagonal down-left
        { r: -1, c: 1 },  // Diagonal up-right
        { r: -1, c: -1 }  // Diagonal up-left
    ];

    

    const colors = [
        "#1E88E5", // Darker Blue
        "#388E3C", // Darker Green
        "#FBC02D", // Darker Yellow
        "#8E24AA", // Darker Purple
        "#00796B", // Darker Teal
        "#7E57C2", // Darker Lavender
        "#FFA000", // Darker Amber
        "#0288D1", // Darker Sky Blue
        "#689F38", // Darker Light Green
        "#F57C00", // Darker Orange
        "#D84315", // Darker Deep Orange
        "#00838F", // Darker Cyan
        "#AB47BC", // Darker Violet
        "#C0CA33", // Darker Lime
        "#1976D2", // Darker Light Blue
        "#9C27B0", // Darker Light Purple
        "#FDD835", // Darker Lemon
        "#E53935", // Darker Red
        "#43A047", // Darker Medium Green
        "#00796B", // Darker Aqua
        "#D81B60", // Darker Pink
        "#C2185B", // Darker Rose
        "#455A64", // Darker Blue Grey
        "#8D6E63", // Darker Warm Grey
        "#3949AB", // Darker Indigo
        "#FF5722", // Darker Vermilion
        "#33691E", // Darker Olive Green
        "#C51162", // Darker Crimson
        "#6A1B9A", // Darker Plum
        "#EF6C00", // Darker Pumpkin
        "#4E342E"  // Darker Coffee
    ];
    
    

    function searchWord(word) {
        const maxAttempts = 1000; // Limit to prevent infinite loop
        let attempts = 0;

        while (attempts < maxAttempts) {
            for (let row = 0; row < grid.length; row++) {
                for (let col = 0; col < grid[row].length; col++) {
                    for (const dir of directions) {             
                        if(canPlaceWord(word, row, col, dir)){
                            const color = colors[Math.floor(Math.random() * colors.length)];
                            highlightWord(word, row, col, dir, color);
                            highlightWordinlist(word, color);
                            return true;
                        }
                    }
                }
            }
            attempts++;
        }
        console.warn(`Could not place word: ${word}`);
        return false;
    }

    function canPlaceWord(word, startRow, startCol, dir) {
        let [row, col] = [startRow, startCol];
        for (const char of word) {
            if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || grid[row][col] !== char) {
                return false;
            }
            row += dir.r;
            col += dir.c;
        }
        return true;
    }
    words.forEach(word => searchWord(word));
}
export function highlightWord(word, startRow, startCol, dir, color) {
    let [row, col] = [startRow, startCol];
    for (const char of word) {
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (cell) {
            cell.style.backgroundColor = color;
        }
        row += dir.r;
        col += dir.c;
    }
}
export function highlightWordinlist(word, color) {
    const wordElement = document.getElementById(`word-${word}`);
    if (wordElement) {
        // Highlight the word with the specified color
        wordElement.style.color = color;

        // Add a tick mark after the word
        const tickMark = document.createElement('span');
        tickMark.textContent = '✔'; // Tick mark
        tickMark.style.color ='green'; // Match the color with the word

        // Check if a tick mark already exists and remove it to avoid duplicates
        const existingTickMark = wordElement.querySelector('span.tick');
        if (existingTickMark) {
            wordElement.removeChild(existingTickMark);
        }

        // Add the new tick mark with a class name
        tickMark.className = 'tick';
        wordElement.appendChild(tickMark);

        // Optionally, add a brief animation
        wordElement.style.transition = 'all 0.3s ease';
        wordElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            wordElement.style.transform = 'scale(1)';
        }, 300);
    } else {
        console.warn(`Word '${word}' not found in the list.`);
    }
}
