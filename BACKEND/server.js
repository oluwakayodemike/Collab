const express = require("express");
const http = require("http");
const Ably = require('ably');
const AblyConnector = require("./src/connector/ably");

const app = express();

// Attaching the Ably connector to the request object
app.use((req, res, next) => {
  req.db = AblyConnector;
  next();
});

app.get("/", (req, res) => {
    res.send("Realtime with Ably!");
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on localhost:" + port)
});