import { useEffect, useLayoutEffect, useState } from "react";
import rough from "roughjs";

const roughGenerator = rough.generator();

let idCounter = 0;

function generateUniqueId(elementType) {
  idCounter += 1;
  return `${elementType}-${idCounter}`;
}

const Board = ({ canvasRef, ctxRef, elements, setElements, tool, color }) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [selectedElementId, setSelectedElementId] = useState(null);
    const [selectedElementInitialPosition, setSelectedElementInitialPosition] = useState(null);
    const [isElementBeingMoved, setIsElementBeingMoved] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        const ctx = canvas.getContext("2d");

        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";

        ctxRef.current = ctx;
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Backspace" || e.key === "Delete") {
                if (selectedElementId) {
                    setElements((prevElements) =>
                        prevElements.filter((ele) => ele.id !== selectedElementId)
                    );
                    setSelectedElementId(null);
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedElementId, setElements]);


    useEffect(() => {
        ctxRef.current.strokeStyle = color;
    }, [color]);

    useLayoutEffect(() => {
        const roughCanvas = rough.canvas(canvasRef.current);

        if (elements.length > 0) {
            ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }

        elements.forEach((element) => {
            if (element.type === "rect") {
                roughCanvas.draw(
                    roughGenerator.rectangle(
                        element.offsetX,
                        element.offsetY,
                        element.width,
                        element.height,
                        { stroke: element.stroke, strokeWidth: 2, roughness: 0 }
                    )
                );
            } else if (element.type === "line") {
                roughCanvas.draw(
                    roughGenerator.line(
                        element.offsetX,
                        element.offsetY,
                        element.width,
                        element.height,
                        { stroke: element.stroke, strokeWidth: 2, roughness: 0 }
                    )
                );
            } else if (element.type === "pencil") {
                roughCanvas.linearPath(element.path, { stroke: element.stroke, strokeWidth: 2, roughness: 0 });
            } else if (element.type === "circle") {
                roughCanvas.draw(
                    roughGenerator.circle(
                        element.offsetX,
                        element.offsetY,
                        element.diameter,
                        { stroke: element.stroke, strokeWidth: 2, roughness: 0 }
                    )
                );
            }

            if (element.id === selectedElementId) {
                if (element.type === "circle") {
                    const selectionBoxX = element.offsetX - element.diameter / 2 - 5;
                    const selectionBoxY = element.offsetY - element.diameter / 2 - 5;
                    const selectionBoxWidth = element.diameter + 10;
                    const selectionBoxHeight = element.diameter + 10;
            
                    ctxRef.current.strokeStyle = "blue";
                    ctxRef.current.lineWidth = 2;
                    ctxRef.current.strokeRect(
                        selectionBoxX,
                        selectionBoxY,
                        selectionBoxWidth,
                        selectionBoxHeight
                    );
                } else if (element.type === "line") {
                    const lineWidth = ctxRef.current.lineWidth;
                    const isPointNearLine = (x, y, element) => {
                        const d = Math.abs(
                            (element.height - element.offsetY) * x -
                            (element.width - element.offsetX) * y +
                            element.width * element.offsetY -
                            element.height * element.offsetX
                        ) / Math.sqrt(
                            (element.height - element.offsetY) ** 2 +
                            (element.width - element.offsetX) ** 2
                        );
                    
                        return d <= lineWidth;
                    };
                    
                    if (isPointNearLine(element.offsetX, element.offsetY, element)) {
                        const selectionBoxX = Math.min(element.offsetX, element.width) - 5;
                        const selectionBoxY = Math.min(element.offsetY, element.height) - 5;
                        const selectionBoxWidth = Math.abs(element.width - element.offsetX) + 10;
                        const selectionBoxHeight = Math.abs(element.height - element.offsetY) + 10;
                    
                        ctxRef.current.strokeStyle = "blue";
                        ctxRef.current.lineWidth = 2;
                        ctxRef.current.strokeRect(
                            selectionBoxX,
                            selectionBoxY,
                            selectionBoxWidth,
                            selectionBoxHeight
                        );
                    }
                } else {
                    const selectionBoxX = element.offsetX - 5;
                    const selectionBoxY = element.offsetY - 5;
                    const selectionBoxWidth = element.width + 10;
                    const selectionBoxHeight = element.height + 10;
            
                    ctxRef.current.strokeStyle = "blue";
                    ctxRef.current.lineWidth = 2;
                    ctxRef.current.strokeRect(
                        selectionBoxX,
                        selectionBoxY,
                        selectionBoxWidth,
                        selectionBoxHeight
                    );
                }
            }
        });
    }, [elements, selectedElementId]);

    const handleMouseDown = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;

        if (tool === "select") {
            for (const element of elements) {
                if (element.type === "line") {
                    // Check if click point is near the line
                    const isPointNearLine = (x, y, element) => {
                        const d = Math.abs(
                            (element.height - element.offsetY) * x -
                            (element.width - element.offsetX) * y +
                            element.width * element.offsetY -
                            element.height * element.offsetX
                        ) / Math.sqrt(
                            (element.height - element.offsetY) ** 2 +
                            (element.width - element.offsetX) ** 2
                        );
                        return d <= 5;
                    };
    
                    if (isPointNearLine(offsetX, offsetY, element)) {
                        setSelectedElementId(element.id);
                        console.log(`You selected ${element.type}-${element.id}`);
                        break;
                    }
                } else if (element.type === "circle") {
                    const distance = Math.sqrt(
                        (element.offsetX - offsetX) ** 2 + (element.offsetY - offsetY) ** 2
                    );
    
                    if (distance <= element.diameter / 2) {
                        setSelectedElementId(element.id);
                        console.log(`You selected ${element.type}-${element.id}`);
                        setSelectedElementInitialPosition({
                          x: element.offsetX,
                          y: element.offsetY,
                        });
                        //reset flags
                        setIsElementBeingMoved(false);
                        setTimeout(() => {
                          setIsElementBeingMoved(true);
                        }, 2000);
                        break;
                    }
                }
                else if (
                    offsetX >= element.offsetX &&
                    offsetY >= element.offsetY &&
                    offsetX <= element.offsetX + element.width &&
                    offsetY <= element.offsetY + element.height
                ) {
                    setSelectedElementId(element.id);
                    console.log(`You selected ${element.type}-${element.id}`);
                    setSelectedElementInitialPosition({
                        x: element.offsetX,
                        y: element.offsetY,
                    });
                    setIsElementBeingMoved(false);
                    setTimeout(() => {
                        setIsElementBeingMoved(true);
                    }, 2000);
                    break;
                }
            }
        } else {
            let newElement;
            let elementType;

            if (tool === "pencil") {
                elementType = "pencil";
                newElement = {
                    id: generateUniqueId(elementType),
                    type: elementType,
                    offsetX,
                    offsetY,
                    path: [[offsetX, offsetY]],
                    stroke: color,
                };
            } else if (tool === "line") {
                elementType = "line";
                newElement = {
                    id: generateUniqueId(elementType),
                    type: elementType,
                    offsetX,
                    offsetY,
                    width: offsetX,
                    height: offsetY,
                    stroke: color,
                };
            } else if (tool === "rect") {
                elementType = "rect";
                newElement = {
                    id: generateUniqueId(elementType),
                    type: elementType,
                    offsetX,
                    offsetY,
                    width: 0,
                    height: 0,
                    stroke: color,
                };
            } else if (tool === "circle") {
                elementType = "circle";
                newElement = {
                    id: generateUniqueId(elementType),
                    type: elementType,
                    offsetX,
                    offsetY,
                    width: 0,
                    height: 0,
                    diameter: 0,
                    stroke: color,
                };
            }

            setSelectedElementId(null);
            setElements((prevElements) => [...prevElements, newElement]);
            setIsDrawing(true);
            console.log(`Created element with ID: ${newElement.id}`);
        }
    };

    const handleMouseMove = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;

        if (isElementBeingMoved) {
            // Move the selected element based on mouse movement
            if (selectedElementId) {
                setElements((prevElements) =>
                    prevElements.map((ele) => {
                        if (ele.id === selectedElementId) {
                            if (ele.type === "line") {
                                // update the line's position
                                const dx = offsetX - selectedElementInitialPosition.x;
                                const dy = offsetY - selectedElementInitialPosition.y;
                                return {
                                    ...ele,
                                    offsetX: selectedElementInitialPosition.x + dx,
                                    offsetY: selectedElementInitialPosition.y + dy,
                                    width: ele.width + dx,
                                    height: ele.height + dy,
                                };
                            } else {
                                return {
                                    ...ele,
                                    offsetX: selectedElementInitialPosition.x + offsetX - selectedElementInitialPosition.x,
                                    offsetY: selectedElementInitialPosition.y + offsetY - selectedElementInitialPosition.y,
                                };
                            }
                        } else {
                            return ele;
                        }
                    })
                );
            }
        }
        else if (isDrawing) {
            if (tool === "pencil") {
                const { path } = elements[elements.length - 1];
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
                }
            } else if (tool === "line") {
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
            } else if (tool === "rect") {
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
            } else if (tool === "circle") {
                const { offsetX: startX, offsetY: startY } = elements[elements.length - 1];
                const radius = Math.sqrt((offsetX - startX) ** 2 + (offsetY - startY) ** 2);

                setElements((prevElements) =>
                    prevElements.map((ele, index) => {
                        if (index === prevElements.length - 1) {
                            return {
                                ...ele,
                                diameter: radius * 2,
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

    const handleMouseUp = () => {
        setIsDrawing(false);
        setSelectedElementId(null);
        setIsElementBeingMoved(false);

        
    };
        
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
