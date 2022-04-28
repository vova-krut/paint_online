import React from "react";
import "../style/canvas.scss";

const Canvas = () => {
    return (
        <div className="canvas">
            <canvas width={600} height={400}></canvas>
        </div>
    );
};

export default Canvas;
