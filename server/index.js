import express from "express";
import expressWs from "express-ws";

const PORT = process.env.PORT || 5000;

const app = express();
const WSServer = expressWs(app);
const aWss = WSServer.getWss();

app.ws("/", (ws, req) => {
    ws.on("message", (msg) => {
        msg = JSON.parse(msg);
        switch (msg.method) {
            case "connection":
                connectionHandler(ws, msg);
                break;
            case "draw":
                broadcastConnection(ws, msg);
                break;
        }
    });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const connectionHandler = (ws, msg) => {
    ws.id = msg.id;
    broadcastConnection(ws, msg);
};

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach((client) => {
        if (client.id === msg.id) {
            client.send(JSON.stringify(msg));
        }
    });
};
