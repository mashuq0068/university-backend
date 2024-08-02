import express from "express"
import reqValidation from "../../middlewares/reqValidation"
import { academicDepartmentValidations } from "./academicDepartment.validation"
import asyncHandler from "../../utils/asyncHandler"
import { academicDepartmentControllers } from "./academicDepartment.controller"
const router = express.Router()
router.post('/create-academic-department' , 
// reqValidation(academicDepartmentValidations.createAcademicDepartmentValidationSchema) ,
 asyncHandler(academicDepartmentControllers.createAcademicDepartment))

router.get('/' , asyncHandler(academicDepartmentControllers.getAcademicDepartments))
router.get('/:academicDepartmentId' , asyncHandler(academicDepartmentControllers.getSingleAcademicDepartment))
router.patch('/:academicDepartmentId' ,reqValidation(academicDepartmentValidations.updateAcademicDepartmentValidationSchema), asyncHandler(academicDepartmentControllers.updateSingleAcademicDepartment))

export const academicDepartmentRoutes = router

