import { successResponse, errorResponse } from "../helpers";
import RegisterStudents from "../services/RegisterStudents";
import FetchCommonStudents from "../services/FetchCommonStudents";
import SuspendStudent from "../services/SuspendStudent";
import RetrieveNotifications from "../services/RetrieveNotifications";

export const register = async (req, res) => {
  try {
    const service = new RegisterStudents(req.body);
    await service.call();
    return successResponse(req, res, {}, 204);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const fetchStudents = async (req, res) => {
  try {
    const service = new FetchCommonStudents(req.query);
    const students = await service.call();
    return successResponse(req, res, { students }, 200);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const suspendStudent = async (req, res) => {
  try {
    const service = new SuspendStudent(req.body);
    await service.call();
    return successResponse(req, res, {}, 204);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
}

export const retrieveNotifications = async (req, res) => {
  try {
    const service = new RetrieveNotifications(req.body);
    const recipients = await service.call();
    return successResponse(req, res, { recipients }, 200);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
}
