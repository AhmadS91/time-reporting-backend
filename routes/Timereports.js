const { TimeReport, validate } = require("../models/Timereport");
const { Activity } = require("../models/Activity");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const timeReports = await TimeReport.find();
  return res.send(timeReports);
});

router.get("/:date", async (req, res) => {
  const timeReport = await TimeReport.findOne({ date: req.params.date });

  if (!timeReport)
    return res.status(404).send("The timereport with given date was'nt found");

  return res.send(timeReport);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const activity = await Activity.findById(req.body.activityId);
  if (!activity) return res.status(400).send("Invalid activity.");
  const timeReport = new TimeReport({
    date: req.body.date,
    startHours: req.body.startHours,
    endHour: req.body.endHour,
    startMinutes: req.body.startMinutes,
    endMinutes: req.body.endMinutes,
    activity: { _id: activity._id, name: activity.name },
  });

  await timeReport.save();
  res.send(timeReport);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const timeReport = await TimeReport.findByIdAndUpdate(
    req.params.id,
    {
      date: req.body.date,
      startHours: req.body.startHours,
      endHour: req.body.endHour,
      startMinutes: req.body.startMinutes,
      endMinutes: req.body.endMinutes,
      activity: req.body.activity,
    },
    { new: true }
  );

  if (!timeReport)
    return res.status(404).send("The timereport with given Id was'nt found");

  res.send(timeReport);
});

router.delete("/:id", async (req, res) => {
  const timeReport = await TimeReport.findByIdAndDelete(req.params.id);

  if (!timeReport._id)
    return res.status(404).send("The timereport with given Id was'nt found");

  res.send(timeReport);
});

module.exports = router;
