import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import './Room.css';
import ToolBar from './ToolBox/ToolBox';

const Room = () => {
    return (
        <div>
            <ToolBar />
            <div className="whiteboard-container">
                <Stage width={window.innerWidth} height={window.innerHeight}>
                    <Layer>
                        {/* Add shapes and drawings here */}
                        {/* Vertical toolbar */}
                        <Rect
                            x={10} // X position of the toolbar
                            y={10} // Y position of the toolbar
                            width={80} // Width of the toolbar
                            height={20} // Height of the toolbar
                            fill="lightgray" // Background color of the toolbar
                            draggable
                        />
                    </Layer>
                </Stage>
            </div>
        </div>
    ); 
};
export default Room