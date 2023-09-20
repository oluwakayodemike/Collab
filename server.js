const express = require("express");
const app = express();

app.get('/', (req, res) => {
    res.send('Hi there');
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`The server will be running at http://localhost:${port}`);
});