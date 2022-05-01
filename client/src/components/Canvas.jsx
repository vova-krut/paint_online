import React, { useEffect, useRef, useState } from "react";
import "../style/canvas.scss";
import { observer } from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import { Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Canvas = observer(() => {
    const canvasRef = useRef();
    const usernameRef = useRef();
    const [modal, setModal] = useState(true);
    const params = useParams();

    useEffect(() => {
        if (canvasState.username) {
            const socket = new WebSocket(`ws://localhost:5000/`);
            socket.onopen = () => {
                console.log("Connection set!");
                socket.send(
                    JSON.stringify({
                        id: params.id,
                        username: canvasState.username,
                        method: "connection",
                    })
                );
            };
            socket.onmessage = (event) => {
                console.log(event.data);
            };
        }
    }, [canvasState.username]);

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current);
        toolState.setTool(new Brush(canvasRef.current));
    }, []);

    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL());
    };

    const connectHandler = () => {
        canvasState.setUsername(usernameRef.current.value);
        setModal(false);
    };

    return (
        <div className="canvas">
            <Modal show={modal} onHide={() => {}}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter your name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" ref={usernameRef} />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => connectHandler()}
                    >
                        Enter
                    </Button>
                </Modal.Footer>
            </Modal>
            <canvas
                onMouseDown={() => mouseDownHandler()}
                ref={canvasRef}
                width={600}
                height={400}
            ></canvas>
        </div>
    );
});

export default Canvas;
