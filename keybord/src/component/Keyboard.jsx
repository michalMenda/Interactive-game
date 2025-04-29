import React, { useState } from 'react';
import { globalNum, keyboards, globalKeys } from './keyboardData';

function Keyboard(props) {
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(0);

  const handleLanguageChange = (e) => {
    setSelectedLanguage(parseInt(e.target.value));
  };

  const handleKeyPress = (key) => {
    if (key === 'CapsLock') {
      setIsCapsLockOn(!isCapsLockOn);
    } else {
      props.onPress(key);
    }
  };

  const currentKeyboardLayout = isCapsLockOn
    ? keyboards[2].layout
    : keyboards[selectedLanguage].layout;

  const renderRow = (row, rowIndex) => (
    <div key={rowIndex} className="keyboardRow">
      {row.map((key, keyIndex) => (
        <button
          key={keyIndex}
          onClick={() => handleKeyPress(key)}
          className={`keyboardKey ${props.selectedKey === key ? 'selected' : ''}`}
          style={{
            padding: '14px 29px',
            fontSize: '22px',
            margin: '1.4px',
            cursor: 'pointer',
            backgroundColor: '#e0e0e0',
            borderRadius: '5px',
            border: '1px solid #ccc',
            minWidth: key === 'Space' ? '200px' : 'auto',
          }}
        >
          {key === 'Space' ? ' ' : key}
        </button>
      ))}
    </div>
  );

  return (
    <div>
      <select onChange={handleLanguageChange} value={selectedLanguage} className="selectedLanguage">
        <option value="0">א ב ג</option>
        <option value="1">a b c</option>
        <option value="3">☺ ☺</option>
        <option value="4">* / $</option>
      </select>
      <div className="keyboardContainer">
        {globalNum.map(renderRow)}
        {currentKeyboardLayout.map(renderRow)}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {globalKeys.map(renderRow)}
        </div>
      </div>
    </div>
  );
}

export default Keyboard;
