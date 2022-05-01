import express from "express";
import expressWs from "express-ws";
import cors from "cors";
import fs from "fs";
import path from "path";

const PORT = process.env.PORT || 5000;

const app = express();
const WSServer = expressWs(app);
const aWss = WSServer.getWss();

app.use(cors());
app.use(express.json());

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

app.post("/image", (req, res) => {
    try {
        const data = req.body.img.replace(`data:image/png;base64,`, "");
        fs.writeFileSync(
            path.resolve("files", `${req.query.id}.jpg`),
            data,
            "base64"
        );
        return res.status(200).json({ message: "Loaded" });
    } catch (e) {
        console.log(e);
        return res.status(500).json("error");
    }
});
app.get("/image", (req, res) => {
    try {
        const file = fs.readFileSync(
            path.resolve("files", `${req.query.id}.jpg`)
        );
        const data = `data:image/png;base64,` + file.toString("base64");
        res.json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json("error");
    }
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
