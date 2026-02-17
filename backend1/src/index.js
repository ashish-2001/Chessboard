import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager.js";

const PORT = process.env.PORT || 8000;

const wss = new WebSocketServer({ PORT });
const gameManager = new GameManager();

wss.on("connection", function connection(ws){
    gameManager.addUser(ws);
    ws.on("disconnect", () => gameManager.removeUser(ws));
});