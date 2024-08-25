import { highlightWordinlist } from '../solver.js';

let turnOffMouseEvents;

export default function playgame(grid, wordList, setNotification, setNext, level) {
    let isDragging = false;
    let selectedCells = [];
    let selectedWord = '';
    let remainingWords = new Set(wordList);
    let direction = null;
    let gameEnded = false;

    const colors = [
        "#1E88E5", "#388E3C", "#FBC02D", "#8E24AA", "#00796B", 
        "#7E57C2", "#FFA000", "#0288D1", "#689F38", "#F57C00", 
        "#D84315", "#00838F", "#AB47BC", "#C0CA33", "#1976D2", 
        "#9C27B0", "#FDD835", "#E53935", "#43A047", "#00796B", 
        "#D81B60", "#C2185B"
    ];

    const gridColors = Array.from({ length: grid.length }, () => Array(grid[0].length).fill(''));

    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach(cell => {
        cell.addEventListener('mousedown', startDrag);
        cell.addEventListener('mouseover', continueDrag);
        cell.addEventListener('mouseup', endDrag);
    });

    function getDirection(cell1, cell2) {
        const rowDiff = Math.abs(cell2.dataset.row - cell1.dataset.row);
        const colDiff = Math.abs(cell2.dataset.col - cell1.dataset.col);

        if (rowDiff === 0 && colDiff > 0) return 'horizontal';   // Horizontal
        if (rowDiff > 0 && colDiff === 0) return 'vertical';     // Vertical
        if (rowDiff === colDiff) return 'diagonal';              // Diagonal

        return null;
    }

    function highlightCell(cell, color) {
        cell.style.backgroundColor = color;
    }

    function addCellToSelection(cell) {
        selectedCells.push(cell);
        selectedWord += cell.textContent;
    }

    function finalizeWordSelection(color) {
        selectedCells.forEach(cell => {
            highlightCell(cell, color);
            if (color !== "grey") {
                gridColors[cell.dataset.row][cell.dataset.col] = color;
            }
        });
        highlightWordinlist(selectedWord, color);
    }

    function blinkIncorrectSelection() {
        const originalColors = selectedCells.map(cell => gridColors[cell.dataset.row][cell.dataset.col]);

        selectedCells.forEach(cell => {
            highlightCell(cell, 'red');
        });

        setTimeout(() => {
            selectedCells.forEach((cell, index) => {
                highlightCell(cell, originalColors[index]);
            });
            selectedCells = [];
            selectedWord = '';
        }, 300);
    }

    function startDrag(event) {
        if (gameEnded) return;
        isDragging = true;
        selectedCells = [];
        selectedWord = '';
        direction = null;
        highlightCell(event.target, 'grey');
        addCellToSelection(event.target);
    }

    function continueDrag(event) {
        if (gameEnded || !isDragging) return;
        const currentCell = event.target;
        const previousCell = selectedCells[selectedCells.length - 1];

        if (!selectedCells.includes(currentCell)) {
            const newDirection = getDirection(previousCell, currentCell);
            if (direction === null) {
                direction = newDirection;
            } else if (direction !== newDirection) {
                blinkIncorrectSelection();
                return;
            }

            highlightCell(currentCell, 'grey');
            addCellToSelection(currentCell);
        }
    }

    function endDrag(event) {
        if (gameEnded || !isDragging) return;
        isDragging = false;
        if (remainingWords.has(selectedWord)) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            finalizeWordSelection(color);
            remainingWords.delete(selectedWord);
            selectedCells = [];
            selectedWord = '';
            if (remainingWords.size === 0) {
                gameEnded = true;
                setTimeout(() => {
                    turnOffMouseEvents();
                    setNext(true);
                    if (level >= 15) {
                        setNotification("Congratulations! You've found all the words!\nYou have completed the Rally !");
                    } else {
                        setNotification("Congratulations! You've found all the words!\n");
                    }
                }, 100);
            }
        } else {
            blinkIncorrectSelection();
        }
    }

    function setupButtonListeners() {
        const endgame = document.getElementById('endgame');
        const generate = document.getElementById('generate');
        if (endgame) {
            endgame.addEventListener('click', () => {
                turnOffMouseEvents();
            });
        }
        if (generate) {
            generate.addEventListener('click', async () => {
                await turnOffMouseEvents();
            });
        }
    }

    turnOffMouseEvents = () => {
        cells.forEach(cell => {
            cell.removeEventListener('mousedown', startDrag);
            cell.removeEventListener('mouseover', continueDrag);
            cell.removeEventListener('mouseup', endDrag);
        });
    };

    setupButtonListeners();
}

export { turnOffMouseEvents };
