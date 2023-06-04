/* Core */
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

/* Globals */
const server = express();

server.set("view engine", "ejs");
server.use(bodyParser.json());
server.use(cookieParser());

/* Data */
const usersStore = [
    {id: 1, username: "guruunoob", password: "fockit"}
]

/* Api Routs */
server.post("/api/v1/login", (req, res) => {
    const {username, password} = req.body;
    const user = usersStore.find(u => u.username == username);

    if (!user) return res.status(401).json({ message: "INCORRECT USERNAME" });
    if (user.password != password) return res.status(401).json({ message: "INCORRECT PASSWORD" });

    return res.cookie("authenticationId", user.id).json({ message: "SUCCESSFULLY LOGGED IN" });
});

server.post("/api/v1/logout", (req, res) => {
    const user = usersStore.find(u => u.id == req.cookies.authenticationId);

    if (!user) return res.status(401).json({ message: "NOT AUTHENTICATED" });

    return res.clearCookie("authenticationId").json({ message: "SUCCESSFULLY LOGGED OUT" });
});

server.get("/", (req, res) => {
    return res.redirect(303, "/home");
});

/* Start Server */
server.listen(8081, () => {
    console.log("Server is now listening on 'localhost:8081'");
});