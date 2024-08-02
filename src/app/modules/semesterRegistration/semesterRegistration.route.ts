import express from 'express';
import reqValidation from '../../middlewares/reqValidation';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';
import asyncHandler from '../../utils/asyncHandler';
import { semesterRegistrationControllers } from './semesterRegistration.controller';
const router = express.Router();
router.post(
  '/create-semester-registration',
  reqValidation(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  asyncHandler(semesterRegistrationControllers.createSemesterRegistration),
);

export const semesterRegistrationRoutes = router;
