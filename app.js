const express = require('express')
const fs = require("fs");
const path = require("path");
const server = express();

server.set("view engine", "pug")

server.get("/", (req, res) => {
    res.render('index.pug')
})

server.get("/", (req, res) => {
    res.render('home.pug')
})

server.get("/", (req, res) => {
    res.render('meals.pug')
})

server.get("/", (req, res) => {
    res.render('order.pug')
})
server.get("/", (req, res) => {
    res.render('drinks.pug')
})
// const getHTML = (url) => {
//     const docPath = path.join(__dirname, "view engine", "pug", url);
//     const html = fs.readFileSync(docPath, { encoding: "utf-8" });
//     return html;
// };

// const reqHandler = (req, res) => {
//     if (req.url === "/") {
//         res.send(getHTML("index.pug"));
//     }
//     res.send(getHTML(req.url.slice(1) + ".pug"));
// };

// const urls = ["/home", "/odrer", "/meals", "/drinks", "/"];

// for (let url of urls) {
//     server.get(url, reqHandler);
// }


const PORT = 8000;
// server.listen(PORT);

server.listen(PORT, () => console.log(`App has been started on ${PORT}...`))