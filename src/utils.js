export function generateGrid(size) {
    return Array.from({ length: size }, () => Array(size).fill(''));
}

export function getRandomWords(size,words) {
    console.log(words)
    let selectedWords =new Set();
    let availableWords = { ...words };


    availableWords = Object.keys(availableWords).reduce((acc, key) => {
        acc[key] = [...availableWords[key]];
        return acc;
    }, {});

    let wordLengths = Object.keys(availableWords).map(Number).filter(len =>len>=size/4 && len <=size);
    wordLengths.sort(() => Math.random() - 0.5);
    let remainingWords = size;
    for (let len of wordLengths) {
        if (remainingWords === 0) break;

        let numWordsToPick = Math.floor(Math.random() * remainingWords) + 1;
        numWordsToPick = Math.min(numWordsToPick, availableWords[len]?.length || 0);

        for (let i = 0; i < numWordsToPick; i++) {
            if (availableWords[len].length===0){break};
            const randomIndex = Math.floor(Math.random() * availableWords[len].length);
            const word = availableWords[len].splice(randomIndex, 1)[0];
           if (!selectedWords.has(word)) {
                 selectedWords.add(word);
             } else {
                 i--;
            }
        }

        remainingWords -= numWordsToPick;
    }

    return Array.from(selectedWords);
}

export function placeWordsInGrid(grid, words) {
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
    const placedWords = []; 
    words.forEach(word => {
        let placed = false;
        let attempts = 0;
        const maxAttempts = 3000;
        while (!placed && attempts<maxAttempts) {
            const direction = directions[Math.floor(Math.random() * directions.length)];
            const startRow = Math.floor(Math.random() * grid.length);
            const startCol = Math.floor(Math.random() * grid[0].length);
            if (canPlaceWord(grid, word, startRow, startCol, direction)) {
                placeWord(grid, word, startRow, startCol, direction);
                placed = true;
                placedWords.push(word);
            }
            attempts++;
        }
    });
    return {grid,placedWords};
}

function canPlaceWord(grid, word, startRow, startCol, dir) {
    let [row, col] = [startRow, startCol];
    for (const char of word) {
        if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || (grid[row][col] !== '' && grid[row][col] !== char)) {
            return false;
        }
        row += dir.r;
        col += dir.c;
    }
    return true;
}

function placeWord(grid, word, startRow, startCol, dir) {
    let [row, col] = [startRow, startCol];
    for (const char of word) {
        grid[row][col] = char;
        row += dir.r;
        col += dir.c;
    }
}

export function fillRandomLetters(grid) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === '') {
                grid[row][col] = letters.charAt(Math.floor(Math.random() * letters.length));
            }
        }
    }
    return grid;
}

export function highlightWordinlist(word, color) {
    const wordElement = document.getElementById(`word-${word}`);
    if (wordElement) {
        wordElement.style.color = color;
        const tickMark = document.createElement('span');
        tickMark.textContent = '✔';
        tickMark.style.color ='green';
        const existingTickMark = wordElement.querySelector('span.tick');
        if (existingTickMark) {
            wordElement.removeChild(existingTickMark);
        }

        tickMark.className = 'tick';
        wordElement.appendChild(tickMark);

        wordElement.style.transition = 'all 0.3s ease';
        wordElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            wordElement.style.transform = 'scale(1)';
        }, 300);
    } else {
        console.warn(`Word '${word}' not found in the list.`);
    }
}


export function clearGridHighlights() {
    const cells = document.querySelectorAll(".grid-cell");
    cells.forEach(cell => {
        cell.style.backgroundColor = "";
    });
}

export async function clearWordListHighlights() {
    const wordsListItems =await document.querySelectorAll("#words-list li");
    console.log("Words List Items:", wordsListItems);
    wordsListItems.forEach(wordElement => {
        const word = wordElement.textContent.trim().replace('✔', '').trim(); // Removing tick mark and whitespace
        clearWordHighlight(word);
    });
}


export function clearWordHighlight(word) {
    const wordElement = document.getElementById(`word-${word}`);
    if (wordElement) {
        wordElement.style.color = '';

        const existingTickMark = wordElement.querySelector('span.tick');
        if (existingTickMark) {
            wordElement.removeChild(existingTickMark);
        }

        wordElement.style.transition = '';
        wordElement.style.transform = '';
    } else {
        console.warn(`Word '${word}' not found in the list.`);
    }
}
