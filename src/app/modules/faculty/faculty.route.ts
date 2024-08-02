import express from 'express';
import { facultyControllers } from './faculty.controller';
import auth from '../../middlewares/auth';
import USER_ROLE from '../user/user.constant';

const router = express.Router();
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.student , USER_ROLE.faculty),
  facultyControllers.getFaculty,
);
router.get('/:facultyId', facultyControllers.getSingleFaculty);
router.patch('/:facultyId', facultyControllers.updateSingleFaculty);
router.delete('/:facultyId', facultyControllers.deleteSingleFaculty);
export const facultyRoutes = router;
