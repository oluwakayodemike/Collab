import React from 'react';
import './ToolBox.css';

const ToolBar = () => {
  return (
    <div className="tool-wrapper">
      <div className="tool-bar">
        <div className="rectangle">
          <img src="https://img.icons8.com/sf-regular/48/hand-cursor.png" alt="hand-cursor" className="icon"/>
          <img src="https://img.icons8.com/external-icongeek26-glyph-icongeek26/64/external-shapes-graphic-design-icongeek26-glyph-icongeek26.png" alt="external-shapes-coding-programming-becris-lineal-becris" className='icon2'/>
          <img width="50" height="50" src="https://img.icons8.com/external-basicons-solid-edtgraphics/50/external-Sticky-notes-office-stationery-basicons-solid-edtgraphics.png" alt="" className='icon2'/>
          <div className="text">D</div>
          <div className="text">E</div>
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
