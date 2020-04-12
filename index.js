const timereports = require("./routes/Timereports");
const activities = require("./routes/Activities");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

mongoose
  .connect("mongodb://localhost/timereport", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((ex) => console.log("Connecting to MongoDB failed", ex.message));

app.use(express.json());
app.use(cors());
app.use("/api/timereports", timereports);
app.use("/api/activities", activities);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening to port"));
