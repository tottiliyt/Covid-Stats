const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");

//get script.js and css
app.use(express.static("assets"));

//send HTML
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/index.html"))
});
  
app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});
