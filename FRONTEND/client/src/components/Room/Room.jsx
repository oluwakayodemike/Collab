import React, { useState, useRef } from 'react';
import "./Room.css"
import Board from "./WhiteBoard/Board";
import Select from "../../assets/ToolBar/select_cursor.svg";
import Pencil from "../../assets/ToolBar/pencil.svg";
import Circle from "../../assets/ToolBar/circle.svg";
import Rectangle from "../../assets/ToolBar/rectangle.svg";
import Line from "../../assets/ToolBar/line1.svg";

const Whiteboard = () => {
    const canvas = useRef(null);
    const ctx = useRef(null);
    const [tool, setTool] = useState("select");
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
                    src={Select}
                    alt="Select Tool"
                    onClick={() => handleToolClick("select")}
                    className={tool === "select" ? "selected" : ""}
                />
                <div className="separator"></div>
                <img
                    src={Pencil}
                    alt="Pencil Tool"
                    onClick={() => handleToolClick("pencil")}
                    className={tool === "pencil" ? "selected" : ""}
                />
                <div className="separator"></div>
                <img
                    src={Circle}
                    alt="Circle Tool"
                    onClick={() => handleToolClick("circle")}
                    className={tool === "circle" ? "selected" : ""}
                />
                <div className="separator"></div>
                <img
                    src={Rectangle}
                    alt="Circle Tool"
                    onClick={() => handleToolClick("rect")}
                    className={tool === "rect" ? "selected" : ""}
                />
                <div className="separator"></div>
                <img
                    src={Line}
                    alt="Line Tool"
                    onClick={() => handleToolClick("line")}
                    className={tool === "line" ? "selected" : ""}
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
