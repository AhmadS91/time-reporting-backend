const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Activity = mongoose.model("Activity", activitySchema);

function validateActivity(activity) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  return schema.validate(activity);
}

exports.Activity = Activity;
exports.activitySchema = activitySchema;
exports.validateActivity = validateActivity;
