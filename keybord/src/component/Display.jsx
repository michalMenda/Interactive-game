import React from 'react';

function Display(props) {
  return (
    <div className='textArea'>
      <div style={{

      }}>
        {props.arr.map(({ key, color, size, font }, index) => (
          <span
            key={index}
            style={{
              color: color || props.color,
              fontSize: `${size || props.size}px`,
              fontFamily: font || props.font,
            }}
          >
            {key}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Display;
