const { TimeReport, validate } = require("../models/Timereport");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const timereports = await TimeReport.find();
  return res.send(timereports);
});

router.get("/:id", async (req, res) => {
  const timereport = await Timereports.findById(req.params.id);

  if (!timereport)
    return res.status(404).send("The timereport with given Id was'nt found");

  return res.send(timereport);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const timereport = new Genre({
    startHours: req.body.startHours,
    endHour: req.body.endHour,
    startMinutes: req.body.startMinutes,
    endMinutes: req.body.endMinutes,
    activity: req.body.activity
  });

  await timereport.save();
  res.send(timereport);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const timereport = await Timereports.findByIdAndUpdate(
    req.params.id,
    {
      startHours: req.body.startHours,
      endHour: req.body.endHour,
      startMinutes: req.body.startMinutes,
      endMinutes: req.body.endMinutes,
      activity: req.body.activity
    },
    { new: true }
  );

  if (!timereport)
    return res.status(404).send("The timereport with given Id was'nt found");

  res.send(timereport);
});

router.delete("/:id", (req, res) => {
  const timereport = timereport.findByIdAndRemove(req.params.id);

  if (!timereport)
    return res.status(404).send("The timereport with given Id was'nt found");

  res.send(timeReport);
});

module.exports = router;
