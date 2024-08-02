import express from 'express';
import { StudentControllers } from './student.controllers';


const router = express.Router();

router.get('/:studentId', StudentControllers.getSingleStudent);

router.delete('/:studentId', StudentControllers.deleteStudent);

router.get('/', StudentControllers.getAllStudents);
router.patch('/:studentId'  , StudentControllers.updateStudent)


export const StudentRoutes = router;