import React, { useState } from 'react';
import './SudokuBoard.css';

function SudokuBoard() {
    
    const solveSudoku = (board) => {
        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };
            const isValid = (row, col, num) => {
              
                for (let i = 0; i < 9; i++) {
                    if (board[row][i] === num || board[i][col] === num) {
                        return false;
                    }
                }
             
                const startRow = Math.floor(row / 3) * 3;
                const startCol = Math.floor(col / 3) * 3;
                for (let i = startRow; i < startRow + 3; i++) {
                    for (let j = startCol; j < startCol + 3; j++) {
                        if (board[i][j] === num) {
                            return false;
                        }
                    }
                }
                return true;
            };

            const solve = () => {
                for (let row = 0; row < 9; row++) {
                    for (let col = 0; col < 9; col++) {
                        if (board[row][col] === null) {
                            const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                            for (let num of numbers) {
                                if (isValid(row, col, num)) {
                                    board[row][col] = num;
                                    if (solve()) {
                                        return true;
                                    }
                                    board[row][col] = null;
                                }
                            }
                            return false;
                        }
                    }
                }
                return true;
            };

            solve();
            return board;
        };
        
        const emptyBoard = Array.from({ length: 9 }, () => Array(9).fill(null));
    const generateRandomPuzzle = () => {

        const solvedPuzzle = solveSudoku(emptyBoard);
        
       
        const puzzle = solvedPuzzle.map(row => row.map(cell => Math.random() > 0.5 ? cell : null));

        return puzzle;
    };

    
    const initialGrid = generateRandomPuzzle().map(row => row.map(cell => ({ value: cell, prefilled: cell !== null })));

    const [grid, setGrid] = useState(initialGrid);
    const [display, setDisplay] = useState('');

   
    const handleCellValueChange = (rowIndex, colIndex, value) => {
        const newGrid = grid.map((row, rIndex) =>
            row.map((cell, cIndex) => {
                if (rIndex === rowIndex && cIndex === colIndex && !cell.prefilled) {
                    return { ...cell, value: value ? parseInt(value) : null };
                }
                return cell;
            })
        );
        setGrid(newGrid);
    };



const handleSolvePuzzle = () => {
        const anyUserFillableFilled = grid.some(row =>
        row.some(cell => !cell.prefilled && cell.value !== null)
    );

   
    if (anyUserFillableFilled) {
        alert("Please clear all user-fillable cells before solving the puzzle.");
        return;
    }


    const confirmSolve = window.confirm("Are you sure you want to see the solution? It can't be undone.");

    if (confirmSolve) {
      
        const solvedGrid = solveSudoku(grid.map(row => row.map(cell => cell.value)));

        const updatedGrid = solvedGrid.map((row, rowIndex) =>
            row.map((cell, colIndex) => ({
                value: cell,
                prefilled: true
            }))
        );
        
        
        setGrid(updatedGrid);
    }
};
const handleValidatePuzzle = () => {
    const solvedPuzzle = solveSudoku(emptyBoard);
    let isPuzzleSolved = true;
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
        for (let colIndex = 0; colIndex < 9; colIndex++) {
            const cell = grid[rowIndex][colIndex];
            const ourVal = cell.value;
            const realVal = solvedPuzzle[rowIndex][colIndex];
            if (!cell.prefilled && ourVal !== realVal) {
                isPuzzleSolved = false;
                break;
            }
        }
        if (!isPuzzleSolved) {
            break; 
        }
    }

    
    if (isPuzzleSolved) {
        setDisplay('Solved');
    } else {
        setDisplay('Unsolved');
    }
};

    const handleClearPuzzle = () => {
        const clearedGrid = grid.map(row =>
            row.map(cell => ({
                value: cell.prefilled ? cell.value : null,
                prefilled: cell.prefilled
            }))
        );
        setGrid(clearedGrid);
        setDisplay('');
    };
 
const renderGrid = () => {
    return grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
                <input
                    key={colIndex}
                    type="number"
                    className={`cell${cell.prefilled ? ' prefilled' : ''}`}
                    value={cell.value || ''}
                    min="1"
                    max="9"
                    readOnly={cell.prefilled} 
                    onChange={(e) => handleCellValueChange(rowIndex, colIndex, e.target.value)}
                />
            ))}
        </div>
    ));
    
};

return (
    <div className="sudoku-board">
        <div className="buttons-container">
        <button className="home-button" onClick={() => window.location.reload()}>Home</button>
            <button onClick={handleValidatePuzzle}>Validate</button>
            <button onClick={handleSolvePuzzle}>Solve</button>
            <button onClick={handleClearPuzzle}>Clear</button>
        </div>
        <div className="display-window">
            {display && <p>{display}</p>}
        </div>
        
        {renderGrid()}
    </div>
);
}
export default SudokuBoard;