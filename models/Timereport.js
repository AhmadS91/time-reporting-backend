const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const { activitySchema } = require("./Activity");

const TimeReport = mongoose.model(
  "TimeReport",
  new mongoose.Schema({
    date: {
      type: String,
      required: true,
    },
    activity: {
      type: activitySchema,
      required: true,
    },
    startHours: {
      type: Number,
      min: 0,
      max: 24,
      required: true,
    },
    endHour: {
      type: Number,
      min: 0,
      maxlength: 24,
      required: true,
    },
    startMinutes: {
      type: Number,
      min: 0,
      max: 59,
      required: true,
    },
    endMinutes: {
      type: Number,
      min: 0,
      maxlength: 59,
      required: true,
    },
  })
);

function validateTimeReport(timeReport) {
  const schema = Joi.object({
    date: Joi.string().required(),
    activityId: Joi.string().required(),
    startHours: Joi.number().min(0).max(24).required(),
    endHour: Joi.number().min(0).max(24).required(),
    startMinutes: Joi.number().min(0).max(59).required(),
    endMinutes: Joi.number().min(0).max(59).required(),
  });

  return schema.validate(timeReport);
}

exports.TimeReport = TimeReport;
exports.validate = validateTimeReport;
