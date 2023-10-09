import React, { useState, useRef } from 'react';
import "./Room.css"
import Board from "./WhiteBoard/Board"

const Whiteboard = () => {
    const canvas = useRef(null);
    const ctx = useRef(null);
    const [tool, setTool] = useState("pencil");
    const [color, setColor] = useState("black");
    const [elements, setElements] = useState([]);

    return (
        <div className='row'>
            <div>
                < Board canvasRef={canvas} ctxRef={ctx} elements={elements} setElements={setElements} color={color} tool={tool}  />
            </div>
            
            <div className="toolbox">
                <img src={PencilIcon} alt="Pencil Tool" onClick={() => setTool("pencil")} />
                <img src={LineIcon} alt="Line Tool" onClick={() => setTool("line")} />
            </div>
            {/* <h1 className='text-center py-8'>Whiteboarding App</h1> */}
            {/* <div className='col-md-12 mt-4 mb-5 d-flex align-items-center justify-content-around'>
                <div className='d-flex col-md-4 justify-content-between gap-1'>
                    <div className='d-flex gap-1'>
                        <label for="pencil">Pencil</label>
                        <input type="radio" name='tool' id="pencil" value='pencil' onChange={(e)=>setTool(e.target.value)}/>
                    </div>
                    <div className='d-flex gap-1'>
                        <label for="line">Line</label>
                        <input type="radio" name='tool' id="line" value='line' onChange={(e)=>setTool(e.target.value)}/>
                    </div>
                    <div className='d-flex gap-1'>
                        <label for="circle">Circle</label>
                        <input type="radio" name='tool' id="circle" value='circle' onChange={(e)=>setTool(e.target.value)}/>
                    </div>
                    <div className='d-flex gap-1'>
                        <label for="rect">Rectangle</label>
                        <input type="radio" name='tool' id="rect" value='rect' onChange={(e)=>setTool(e.target.value)}/>
                    </div>
                </div>
            </div> */}

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
