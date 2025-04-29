
import React, { useState } from "react";
import "./GameBoard.css";
import Leaderboard from "./Leaderboard";

function GameBoard({ players, setPlayers }) {
  const [scores, setScores] = useState({});
  const [moves, setMoves] = useState({});
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [leaderboard, setLeaderboard] = useState(JSON.parse(localStorage.getItem("leaderboard")));
  localStorage.getItem("leaderboard") ? null : localStorage.setItem("leaderboard", JSON.stringify([{ name: null, points: -1 }, { name: null, points: -1 }, { name: null, points: -1 }]));

  const operations = ["+1", "-1", "*2", "/2"];

  const updateLeaderboard = (playerName, moves) => {
    const updatedPlayers = players.map((player) => {
      if (player.name === playerName) {
        const updatedWins = [...(player.wins || []), moves];
        const totalMoves = updatedWins.reduce((sum, win) => sum + win, 0);
        const averageMoves = totalMoves / updatedWins.length;
        return {
          ...player,
          wins: updatedWins,
          averageMoves,
        };
      }
      return player;
    });
    setPlayers(updatedPlayers);
  };

  // מכניסה למערך של המובילים
  function setLeaders(player) {
    let allLeaders = leaderboard;
    if (allLeaders[0].points < player.points) {
      if (allLeaders[0].name != player.name) {
        allLeaders[2] = allLeaders[1];
        allLeaders[1] = allLeaders[0];
        allLeaders[0] = player;
      }
      else
        allLeaders[0].points += player.points;
    } else if (allLeaders[1].points < player.points) {
      if (allLeaders[1].name != player.name) {
        allLeaders[2] = allLeaders[1];
        allLeaders[1] = player;
      }
      else
        allLeaders[1].points += player.points;
    } else if (allLeaders[2].points < player.points) {
      if (allLeaders[2].name != player.name) {
        allLeaders[2] = player;
      }
      else
        allLeaders[2].points += player.points;
    }
    localStorage.setItem("leaderboard", JSON.stringify(allLeaders));
    setLeaderboard(allLeaders);
    updateLeaderboard(player.name, player.points)
  }

  const initializeScoresAndMoves = () => {
    const initialScores = players.reduce((acc, player) => {
      acc[player.name] = Math.floor(Math.random() * 100);
      return acc;
    }, {});
    const initialMoves = players.reduce((acc, player) => {
      acc[player.name] = 0;
      return acc;
    }, {});
    setScores(initialScores);
    setMoves(initialMoves);
  };

  const removePlayer = (playerName) => {
    const updatedPlayers = players.filter((player) => player.name !== playerName);
    setPlayers(updatedPlayers);
    setCurrentPlayerIndex((currentPlayerIndex) % updatedPlayers.length);
  };

  const updateplayerstats = (playerName, movesToWin) => {
    const allplayers = JSON.parse(localStorage.getItem("allPlayers")) || [];
    const player = allplayers.find((p) => p.name === playerName);
    player.scoreHistory = player.scoreHistory || [];
    player.scoreHistory.push(movesToWin);
    player.totalPoints += Math.floor(100 / movesToWin);
    localStorage.setItem("allPlayers", JSON.stringify(allplayers));
    const setLeadersArr = { name: playerName, points: player.totalPoints }
    setLeaders(setLeadersArr)
  };

  const handlePlayerMove = (operation) => {
    const currentPlayerName = players[currentPlayerIndex].name;
    let newScore = scores[currentPlayerName];
    let newMoves = moves[currentPlayerName] + 1;

    switch (operation) {
      case "+1":
        newScore += 1;
        break;
      case "-1":
        newScore -= 1;
        break;
      case "*2":
        newScore *= 2;
        break;
      case "/2":
        newScore = Math.floor(newScore / 2);
        break;
      default:
        break;
    }

    const updatedScores = { ...scores, [currentPlayerName]: newScore };
    const updatedMoves = { ...moves, [currentPlayerName]: newMoves };

    if (newScore === 100) {
      updateplayerstats(currentPlayerName, newMoves);
      setCurrentPlayer(currentPlayerName);
      setShowModal(true);
      return;
    }
    setScores(updatedScores);
    setMoves(updatedMoves);
    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
  };

  const handleContinueGame = () => {
    setScores((prevScores) => ({
      ...prevScores,
      [currentPlayer]: Math.floor(Math.random() * 100),
    }));
    setMoves((prevMoves) => ({
      ...prevMoves,
      [currentPlayer]: 0,
    }));
    setShowModal(false);
  };

  const handleExitGame = () => {
    setShowModal(false);
    removePlayer(currentPlayer);
  };

  if (Object.keys(scores).length === 0 && players.length > 0) {
    initializeScoresAndMoves();
  }

  return (
    <div className="game-board">
      {players.map((player, index) => (
        <div
          key={player.name}
          className={`player-board ${index === currentPlayerIndex ? "active" : ""}`}
        >
          <h3>{player.name}</h3>
          <p>Score: {scores[player.name]}</p>
          <p>Moves: {moves[player.name]}</p>
          {operations.map((op) => (
            <button
              key={op}
              onClick={() => handlePlayerMove(op)}
              disabled={index !== currentPlayerIndex}
            >
              {op}
            </button>
          ))}
        </div>
      ))}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{currentPlayer} הגעת ל-100!</h2>
            <p>האם תרצה להמשיך לשחק או לצאת מהמשחק?</p>
            <button onClick={handleContinueGame}>המשך לשחק</button>
            <button onClick={handleExitGame}>צא מהמשחק</button>
          </div>
        </div>
      )}
      <Leaderboard leaderboard={leaderboard} />
    </div>
  );
}

export default GameBoard;
