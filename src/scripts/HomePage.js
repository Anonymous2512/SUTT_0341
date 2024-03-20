import React from 'react';
import './HomePage.css'; // Import CSS file for styling

function HomePage({ onStartGame }) {
    return (
        <div className="home-page">
            
            <div className="row">
                <div className="column">
                    <h1>Welcome to </h1>
                    <h2>Sudoku</h2>
                    <p>Unlock the mystery,<br></br>sharpen your mind,<br></br>and conquer the grid <br></br>    with Sudoku! </p>
                    <button id="start-game-btn" onClick={onStartGame}>Start Game</button>
                </div>
                <div className="column">
                    <img src="/image1.png" alt="Image" >
                        </img>
                </div>
            </div>
            
            <div className="containers">
            <h2 className="title">Instructions</h2>
    
           
            <div className="row">
            <div className="procol">
            <img src="/rule1.png" />
            <p>Each row must contain the numbers<br></br> from 1 to 9, without repetitions</p>
           
            </div>
            <div className="procol">
            <img src="/rule2.png" />
           <p>Each column must contain the numbers<br></br> from1 to 9, without repetitions</p>
            </div>
            </div>
            <div className="row">
            <div className="procol">
            <img src="/rule3.png" />
            <p>The digits can only occur once per nonet</p>
           
            </div>
            <div className="procol">
            <img src="/rule4.png" />
           <p>The sum of every single row, column<br></br>and nonet must equal 45</p>
            </div>
            </div>
            </div>
            
            
            <hr></hr>
        <h3 className="copyright">Copyright 2024 Viren Singh</h3>
        </div>

        
    );
}

export default HomePage;
