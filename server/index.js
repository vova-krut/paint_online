import express from "express";
import expressWs from "express-ws";

const PORT = process.env.PORT || 5000;

const app = express();
const WSServer = expressWs(app);

app.ws("/", (ws, req) => {
    console.log("Connection set");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
