import express from 'express';
import { CourseControllers } from './course.controller';
import { CourseValidations } from './course.validation';
import reqValidation from '../../middlewares/reqValidation';
import asyncHandler from '../../utils/asyncHandler';

const router = express.Router();

router.post(
  '/create-course',
  reqValidation(CourseValidations.createCourseValidationSchema),
  asyncHandler( CourseControllers.createCourse),
);

router.get('/:id', CourseControllers.getSingleCourse);

router.patch(
  '/:id',
  reqValidation(CourseValidations.updateCourseValidationSchema),
  asyncHandler(CourseControllers.updateCourse),
);

router.delete('/:id', CourseControllers.deleteCourse);

router.put(
  '/:courseId/assign-faculties',
  reqValidation(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);

// router.delete(
//   '/:courseId/remove-faculties',
//   reqValidation(CourseValidations.facultiesWithCourseValidationSchema),
//   CourseControllers.removeFacultiesFromCourse,
// );

router.get('/',  asyncHandler(CourseControllers.getAllCourses));

export const CourseRoutes = router;