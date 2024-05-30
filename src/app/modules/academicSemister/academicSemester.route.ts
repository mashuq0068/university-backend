import express from 'express';
import reqValidation from '../../middlewares/reqValidation';
import { academicSemesterControllers } from './academicSemester.controller';
import asyncHandler from '../../utils/asyncHandler';
import { academicValidationSchema, updateAcademicSemesterValidationSchema } from './academicSemester.validation';


const router = express.Router();
// create
router.post(
  '/create-academic-semester',
  reqValidation(academicValidationSchema),
  asyncHandler(academicSemesterControllers.createAcademicSemester),
);

// get all
router.get('/', asyncHandler(academicSemesterControllers.getAcademicSemesters));

// get single
router.get(
  '/:id',
  asyncHandler(academicSemesterControllers.getSingleAcademicSemester),
);

// update one
router.patch(
  '/:id',
  reqValidation(updateAcademicSemesterValidationSchema),
  asyncHandler(academicSemesterControllers.updateSingleAcademicSemester),
);

export const academicSemesterRoutes = router;
