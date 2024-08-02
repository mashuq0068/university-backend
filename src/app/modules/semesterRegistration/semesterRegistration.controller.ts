import httpStatus from 'http-status';
import sendResponse from '../../utils/SendResponse';
import { semesterRegistrationServices } from './semesterRegistration.service';
import { RequestHandler } from 'express';

const createSemesterRegistration: RequestHandler = async (req, res) => {
  const payload = req.body;
  const result =
    await semesterRegistrationServices.createSemesterRegistrationIntoDB(
      payload,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration done successfully',
    data: result,
  });
};

export const semesterRegistrationControllers = {
  createSemesterRegistration,
};
