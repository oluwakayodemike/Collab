import React, { useState, useRef, useEffect } from 'react';
import "./Room.css";
import Header from "./Header/Header"
import Board from "./WhiteBoard/Board";
import Select from "../../assets/ToolBar/select_cursor.svg";
import Pencil from "../../assets/ToolBar/pencil.svg";
import Circle from "../../assets/ToolBar/circle.svg";
import Rectangle from "../../assets/ToolBar/rectangle.svg";
import Line from "../../assets/ToolBar/line.svg";
import Undo from "../../assets/ToolBar/undo.svg";
import Redo from "../../assets/ToolBar/redo.svg";

const Whiteboard = () => {
    const canvas = useRef(null);
    const ctx = useRef(null);
    const [tool, setTool] = useState("pencil");
    const [color, setColor] = useState("black");
    const [elements, setElements] = useState([]);
    const [history, setHistory] = useState([]);
    
    const handleToolClick = (selectedTool) => {
        setTool(selectedTool);
    };

    const undo = () => {
        if (elements.length === 0) {
            return;
        }
    
        setHistory((prevHistory) => [
            ...prevHistory,
            elements[elements.length - 1],
        ]);
    
        setElements((prevElements) => {
            const updatedElements = prevElements.slice(0, prevElements.length - 1);
            ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
            updatedElements.forEach((element) => {
            });
    
            return updatedElements;
        });
    };
    
    const redo = () => {
        setElements((prevElements) =>[
            ...prevElements,
            history[history.length - 1],
        ]);
        setHistory((prevHistory) => prevHistory.slice(0, prevHistory.length - 1))
    };
    
    return (
        <div className='Board'>
            < Header />
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
                <div className="separator"></div>
                <img
                    src={Undo}
                    alt="Undo Tool"
                    disabled={elements.length === 0}
                    onClick={() => undo()}
                />
                <div className="separator"></div>
                <img
                    src={Redo}
                    alt="Redo Tool"
                    disabled={elements.history < 1}
                    onClick={() => redo()}
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
