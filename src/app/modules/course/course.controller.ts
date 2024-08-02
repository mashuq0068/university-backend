import httpStatus from 'http-status';
import sendResponse from '../../utils/SendResponse';
import { courseServices } from './course.service';
import { RequestHandler } from 'express';

const createCourse: RequestHandler = async (req, res) => {
  const result = await courseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is created succesfully',
    data: result,
  });
};

const getAllCourses: RequestHandler = async (req, res) => {
  const result = await courseServices.getAllCoursesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course are retrieved successfully',
    data: result,
  });
};

const getSingleCourse: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.getSingleCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is retrieved successfully',
    data: result,
  });
};

const updateCourse: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.updateCourseIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course is updated successfully',
    data: result,
  });
};

const deleteCourse: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.deleteCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is deleted successfully',
    data: result,
  });
};
const assignFacultiesWithCourse: RequestHandler = async (req, res) => {
  const { courseId } = req.params;
  const result = await courseServices.assignCourseFacultyIntoDB(
    courseId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Faculty is created successfully',
    data: result,
  });
};

export const CourseControllers = {
  createCourse,
  getSingleCourse,
  getAllCourses,
  deleteCourse,
  updateCourse,
  assignFacultiesWithCourse,
 
};
