import { successResponse, errorResponse } from "../helpers";
import RegisterStudents from "../services/RegisterStudents";
import FetchCommonStudents from "../services/FetchCommonStudents";

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
    const { tutor } = query;
    console.log(tutor)
    // const service = new FetchCommonStudents({ students: tutor?.split(/\s*,\s*/) });
    // const students = await service.call();
    return successResponse(req, res, {}, 200);
  } catch (error) {
    console.log(error)
    return errorResponse(req, res, error.message);
  }
};

