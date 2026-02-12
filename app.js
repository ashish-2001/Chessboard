import express from "express";
import { Socket } from "socket.io";
import http from "http";
import { Chess } from "chess.js";

const app = express();
const server = http.createServer(app);

const io = Socket(server);

const chess = new Chess();
let players = {};
let currentPlayer = "w";

app.set("view engine", "ejs");
app.use(express.static(path.join(dir_name, "public")));

app.get("/", (req, res) => {
    res.render("index");
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
})