import React, { useState } from "react";
import GameBoard from "./component/GameBoard";
import UserLogin from "./component/UserLogin";
import "./App.css";

function App() {
  const [players, setPlayers] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleStartGame = () => {
    if (players.length >= 1) {
      setIsGameStarted(true);
    }
  };

  return (
    <div className="App">
      {!isGameStarted ? (
        <div>
          <UserLogin players={players} setPlayers={setPlayers} />
          <button onClick={handleStartGame} disabled={players.length < 1} className="resetGame"> התחל משחק </button>
        </div> ) : (
        <>
          <GameBoard players={players} setPlayers={setPlayers} />
          <button className="newGame" onClick={() => setIsGameStarted(!isGameStarted)}>להתחלת משחק חדש</button>
        </>
      )}
    </div>
  );
}

export default App;

