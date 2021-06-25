import express from "express";

import { validate } from "express-validation";

import * as apiController from "../controllers/api.controller";
import * as apiValidator from "../controllers/api.validator";

const router = express.Router();

// api/register
router.post("/register", validate(apiValidator.register, { keyByField: true }), apiController.register);

router.get("/getcommonsstudents", validate(apiValidator.fetchStudents, { keyByField: true }), apiController.fetchStudents);

router.post("/suspend", validate(apiValidator.suspendStudent, { keyByField: true }), apiController.suspendStudent);

router.post("/retrievenotifications", validate(apiValidator.retrieveNotifications, { keyByField: true }), apiController.retrieveNotifications);

module.exports = router;
