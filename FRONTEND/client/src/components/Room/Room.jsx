import React, { useState, useRef } from 'react';
import "./Room.css"
import Board from "./WhiteBoard/Board"
import PencilIcon from "../../assets/ToolBar/meeee.png"
const Whiteboard = () => {
    const canvas = useRef(null);
    const ctx = useRef(null);
    const [tool, setTool] = useState("pencil");
    const [color, setColor] = useState("black");
    const [elements, setElements] = useState([]);

    const handleToolClick = (selectedTool) => {
        setTool(selectedTool);
    };

    return (
        <div className='row'>
            <div>
                < Board canvasRef={canvas} ctxRef={ctx} elements={elements} setElements={setElements} color={color} tool={tool}  />
            </div>
            
            {/* set for "rect",  "pencil", "line", and circle */}
            <div className="toolbox">
                <img
                    src={PencilIcon}
                    alt="Pencil Tool"
                    onClick={() => handleToolClick("pencil")}
                    className={tool === "pencil" ? "selected" : ""}
                />
            </div>

            {/* color feature soon... */}
            {/* <div className='col-md-3 mx-auto'>
                <div className='d-flex justify-content-center'>
                    <label htmlFor="color">Select Color:</label>
                    <input type="color" id='color' className='mt-1 ms-3' value='color' onChange={(e)=>setColor(e.target.value)} />
                </div>
            </div> */}
        </div>
    );
};

export default Whiteboard;
