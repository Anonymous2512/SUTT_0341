import React, { useState } from 'react';
import SudokuBoard from './components/SudokuBoard';
import HomePage from './scripts/HomePage';

function App() {
    const [gameStarted, setGameStarted] = useState(false);

    const handleStartGame = () => {
        console.log("Game started");
        setGameStarted(true);
    };

    return (
        <div className="app">
            {!gameStarted ? <HomePage onStartGame={handleStartGame} /> : <SudokuBoard />}
        </div>
    );
}

export default App;
