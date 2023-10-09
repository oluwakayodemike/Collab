import { useEffect, useLayoutEffect, useState } from "react";
import rough from "roughjs";

const roughGenerator = rough.generator();

const Board = ({ canvasRef, ctxRef, elements, setElements, tool, color }) => {
    
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        const ctx = canvas.getContext("2d");

        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";

        ctxRef.current = ctx;
    }, [])

    useEffect(() => {
        ctxRef.current.strokeStyle = color;
    }, [color]);

    useLayoutEffect(() => {
        const roughCanvas = rough.canvas(canvasRef.current);

        if(elements.length > 0) {
            ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }

        elements.forEach((element) => {
            if (element.type === "rect") {
                roughCanvas.draw(
                    roughGenerator.rectangle( element.offsetX, element.offsetY, element.width, element.height, { stroke: element.stroke, strokeWidth: 5, roughness: 0, } )
                );
            }   else if(element.type === "line") {
                roughCanvas.draw(
                    roughGenerator.line(element.offsetX, element.offsetY, element.width, element.height, { stroke: element.stroke, strokeWidth: 5, roughness: 0, })
                );
            }   else if(element.type === "pencil") {
                roughCanvas.linearPath(element.path, { stroke: element.stroke, strokeWidth: 2, roughness: 0, });
            }
        });
    }, [elements]);

    const handleMouseDown = (e) => {
        const {offsetX, offsetY} = e.nativeEvent;

        if(tool === "pencil"){
            setElements((prevElements) => [
                ...prevElements,
                {
                    type: "pencil",
                    offsetX,
                    offsetY,
                    path: [[offsetX, offsetY]],
                    stroke: color,
                }
            ]);
        }

        else if(tool === "line"){
            setElements((prevElements) => [
                ...prevElements,
                {
                    type: "line",
                    offsetX,
                    offsetY,
                    width: offsetX,
                    height: offsetY,
                    stroke: color,
                }
            ]);          
        }

        else if(tool === "rect"){
            setElements((prevElements) => [
                ...prevElements,
                {
                    type: "rect",
                    offsetX,
                    offsetY,
                    width: 0,
                    height: 0,
                    stroke: color,
                }
            ]);
        }

        setIsDrawing(true);
    };

    const handleMouseMove = (e) => {
        const {offsetX, offsetY} = e.nativeEvent;
        
        if(isDrawing){
            if ( tool === "pencil" ) {
                const {path}  = elements[elements.length - 1];
                const newPath = [...path, [offsetX, offsetY]];

                if (tool === "pencil") {
                    setElements((prevElements) =>
                        prevElements.map((ele, index) => {
                            if (index === prevElements.length - 1) {
                                return {
                                    ...ele,
                                    path: newPath,
                                };
                            } else {
                                return ele;
                            }
                        })
                    );
                };
            }   else if (tool === "line") {
                setElements((prevElements) =>
                    prevElements.map((ele, index) => {
                        if (index === prevElements.length - 1) {
                            return {
                                ...ele,
                                width: offsetX,
                                height: offsetY,
                            };
                        } else {
                            return ele;
                        }
                    })
                );
            }   else if (tool === "rect") {
                setElements((prevElements) =>
                    prevElements.map((ele, index) => {
                        if (index === prevElements.length - 1) {
                            return {
                                ...ele,
                                width: offsetX - ele.offsetX,
                                height: offsetY - ele.offsetY,
                            };
                        } else {
                            return ele;
                        }
                    })
                );
            }
        }
    };

    const handleMouseUp = (e) => {
        setIsDrawing(false);
        
    }

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflow: "hidden",
            }}
    
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export default Board;