import { RequestHandler } from 'express';
import { facultyServices } from './faculty.service';
import sendResponse from '../../utils/SendResponse';

const getFaculty: RequestHandler = async (req, res) => {
  const result = await facultyServices.getFacultyFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'students fetched successfully',
    data: result,
  });
};
const getSingleFaculty: RequestHandler = async (req, res) => {
  const id = req.params.facultyId;
  const result = await facultyServices.getSingleFacultyFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'student fetched successfully',
    data: result,
  });
};
const updateSingleFaculty: RequestHandler = async (req, res) => {
  const { facultyId } = req.params;
  const { faculty } = req.body;
  const result = await facultyServices.updateSingleFacultyFromDB(
    facultyId,
    faculty,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'student updated successfully',
    data: result,
  });
};
const deleteSingleFaculty: RequestHandler = async (req, res) => {
  const id = req.params.facultyId;
  const result = await facultyServices.deleteSingleFacultyFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'student deleted successfully',
    data: result,
  });
};
export const facultyControllers = {
  getFaculty,
  getSingleFaculty,
  updateSingleFaculty,
  deleteSingleFaculty,
};
