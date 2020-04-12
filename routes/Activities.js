const { Activity, validateActivity } = require("../models/Activity");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const activity = await Activity.find();
  return res.send(activity);
});

router.get("/:id", async (req, res) => {
  const activity = await Activity.findById(req.params.id);

  if (!activity)
    return res.status(404).send("The activity with given Id was'nt found");

  return res.send(activity);
});

router.post("/", async (req, res) => {
  const { error } = validateActivity(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let activity = new Activity({
    name: req.body.name,
  });

  await activity.save();
  res.send(activity);
});

router.put("/:id", async (req, res) => {
  const { error } = validateActivity(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const activity = await Activity.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );

  if (!activity)
    return res.status(404).send("The activity with given Id was'nt found");

  res.send(activity);
});

router.delete("/:id", async (req, res) => {
  const activity = await Activity.findByIdAndRemove(req.params.id);

  if (!activity)
    return res.status(404).send("The activity with given Id was'nt found");

  res.send(activity);
});

module.exports = router;
