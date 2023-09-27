const express = require("express");
const http = require("http");
const Ably = require('ably');

const app = express();

app.get("/", (req, res) => {
    res.send("Realtime with Ably!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on localhost:" + port)
});