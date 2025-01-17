import { Joi } from "express-validation";

export const register = {
  body: Joi.object({
    tutor: Joi.string().email().required(),
    students: Joi.array().items(Joi.string().email()).required().min(1),
  }),
};

export const fetchStudents = {
  query: Joi.object({
    tutor: Joi.alternatives().try(
      Joi.string().email(),
      Joi.array().items(Joi.string().email()).min(2)
    ).required(),
  }).required()
};

export const suspendStudent = {
  body: Joi.object({
    student: Joi.string().email().required(),
  }),
};

export const retrieveNotifications = {
  body: Joi.object({
    tutor: Joi.string().email().required(),
    notification: Joi.string().min(1).required(),
  }),
};