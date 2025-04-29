import React, { useState } from "react";
import "./UserLogin.css";
function UserLogin({ players, setPlayers }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(true);

  const clearFields = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleAddPlayer = (newPlayer) => {
    const playerExists = players.some((p) => p.name === newPlayer.name);
    if (!playerExists && players.length < 6) {
      setPlayers([...players, newPlayer]);
    } else if (playerExists) {
      alert("שחקן זה כבר קיים!");
    } else {
      alert(`ניתן להוסיף עד ${6} שחקנים בלבד.`);
    }
  };
  
  const handleAdd = () => {
    const allPlayers = JSON.parse(localStorage.getItem("allPlayers")) || [];
    const playerExists = allPlayers.some(player => player.name === name);

    if (playerExists) {
      setMessage(`ברוך הבא ${name}, יש להתחבר למערכת.`);
    } else {
      const newPlayer = {
        name,
        password,
        email,
        scoreHistory: [],
        totalPoints: 0
      };
      allPlayers.push(newPlayer);
      localStorage.setItem("allPlayers", JSON.stringify(allPlayers));
      setMessage(`הרישום הצליח! ברוך הבא, ${name}.`);

      handleAddPlayer(newPlayer);
    }

    clearFields();
  };

  const handleLogin = () => {
    const allPlayers = JSON.parse(localStorage.getItem("allPlayers")) || [];
    const player = allPlayers.find(player => player.name === name && player.password === password);

    if (player) {
      setMessage(`${name}, התחברת בהצלחה!`);
      handleAddPlayer(player);
    } else {
      setMessage("שם המשתמש או הסיסמה אינם נכונים. נסה שוב.");
    }

    clearFields();
  };

  return (
    <div className="userLoginContainer">
      <h2>{isRegistering ? "רישום שחקנים" : "התחברות שחקן"}</h2>
      <div className="playerBoard">
        <input
          type="text"
          placeholder="שם שחקן"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="inputField"
        />
        <input
          type="password"
          placeholder="סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="inputField"
        />
        {isRegistering && (
          <input
            type="email"
            placeholder="אימייל"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="inputField"
          />
        )}
      </div>
      <button className="submit" onClick={isRegistering ? handleAdd : handleLogin}>
        {isRegistering ? "הוסף שחקן" : "התחבר"}
      </button>

      {message && <p className="message">{message}</p>}

      <p className="toggleAuth">
        <span onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "כבר רשום? התחבר" : "לא רשום? הרשמה"}
        </span>
      </p>
    </div>
  );
}

export default UserLogin;