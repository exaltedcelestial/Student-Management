import { successResponse, errorResponse } from "../helpers";
import RegisterStudents from "../services/RegisterStudents";
import FetchStudents from "../services/FetchStudents";

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
    const { query = {} } = req;
    const { emails } = query;
    const service = new FetchStudents({ students: emails?.split(/\s*,\s*/) });
    const students = await service.call();
    return successResponse(req, res, students, 200);
  } catch (error) {
    console.log(error)
    return errorResponse(req, res, error.message);
  }
};

