const mongoose = require("mongoose");
const express = require("express");
const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost/timereport", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Connecting to MongoDB failed", err));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening to port"));
