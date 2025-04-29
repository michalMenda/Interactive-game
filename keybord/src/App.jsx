import React, { useState } from 'react';
import TextFormatting from './component/TextFormatting';
import Keyboard from './component/Keyboard';
import Display from './component/Display';
import './App.css';

function App() {
  const [keyChosen, setKeyChosen] = useState([]);
  const [keyLanguage, setKeyLanguage] = useState(0);
  const [color, setColor] = useState('#ffffff');
  const [size, setFontSize] = useState(20);
  const [font, setFontType] = useState('Arial');
  const [all, setIsActive] = useState(false);
  const [history, setHistory] = useState([]);

  const updateKeyChosen = (keyPress) => {
    setHistory(prevHistory => [...prevHistory, keyChosen]);

    let newKey = { key: keyPress, color, size, font };
    if (keyPress === 'Enter') newKey.key = <br />;
    else if (keyPress === 'Space') newKey.key = " ";
    else if (keyPress === 'Backspace') {
      if (all) {
        setKeyChosen([]);
      } else {
        setKeyChosen(prevKeyPress => prevKeyPress.slice(0, -1));
      }
      return;
    }
    setKeyChosen(prevKeyPress => [...prevKeyPress, newKey]);
  };

  const updateAttributes = (attribute, value) => {
    const updateState = {
      color: setColor,
      size: setFontSize,
      font: setFontType,
    };

    updateState[attribute](value);
    if (all) {
      setKeyChosen(prevKeyPress =>
        prevKeyPress.map(item => ({ ...item, [attribute]: value }))
      );
    }
  };

  const goBack = () => {
    setHistory(prevHistory => {
      const lastState = prevHistory.pop();
      if (lastState) setKeyChosen(lastState);
      return [...prevHistory];
    });
  };

  return (
    <div className='screen'>
      <Display
        newKey={keyChosen}
        color={color}
        size={size}
        font={font}
        all={all}
        arr={keyChosen}
      />
      <TextFormatting
        keyboardNumber={setKeyLanguage}
        kindColor={(color) => updateAttributes('color', color)}
        fontSize={(size) => updateAttributes('size', size)}
        fontType={(font) => updateAttributes('font', font)}
        selectAll={() => setIsActive(prevState => !prevState)}
        isSelected={all}
        goBack={goBack}
      />
      <Keyboard
        newLanguage={keyLanguage}
        onPress={updateKeyChosen}
      />
    </div>

  );
}

export default App;
