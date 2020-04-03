const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const TimeReport = mongoose.model(
  "Timereport",
  new mongoose.Schema({
    date: {
      type: Date,
      required: true
    },
    startHours: {
      type: Number,
      min: 0,
      max: 24,
      required: true
    },
    endHour: {
      type: Number,
      min: 0,
      maxlength: 24,
      required: true
    },
    startMinutes: {
      type: Number,
      min: 1,
      max: 59,
      required: true
    },
    endMinutes: {
      type: Number,
      min: 1,
      maxlength: 59,
      required: true
    },
    activity: {
      type: String,
      required: true
    }
  })
);

function validateTimereport(timereport) {
  const schema = Joi.object({
    date: Joi.date().required(true),
    startHours: Joi.number()
      .min(0)
      .max(24)
      .required(),
    endHour: Joi.number()
      .min(0)
      .max(24)
      .required(),
    startMinutes: Joi.number()
      .min(1)
      .max(59)
      .required(),
    endMinutes: Joi.number()
      .min(1)
      .max(59)
      .required(),
    activity: Joi.string().required(true)
  });

  return schema.validate(timereport);
}

exports.TimeReport = TimeReport;
exports.validate = validateTimereport;
