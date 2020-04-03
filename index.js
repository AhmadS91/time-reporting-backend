const timereports = require("./routes/Timereports");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/timereport", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(ex => console.log("Connecting to MongoDB failed", ex.message));

app.use(express.json());
app.use("/api/timereports", timereports);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening to port"));
