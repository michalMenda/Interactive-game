import React, { useState } from "react";
import "./Leaderboard.css";

function Leaderboard({ leaderboard }) {

  return (
    <div className="leaderboard">
      <h2>לוח מובילים</h2>
      <ul>
        {leaderboard.map((player, index) => (
          <li key={index}>
            {player.name} {player.points}
          </li>
        ))}
      </ul>
    </div>
  );
}


export default Leaderboard;
