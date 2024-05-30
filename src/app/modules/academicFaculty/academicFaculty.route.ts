import express from "express"
import reqValidation from "../../middlewares/reqValidation"
import asyncHandler from "../../utils/asyncHandler"
import { academicFacultyControllers } from "./academicFaculty.controller"
import { AcademicFacultyValidations } from "./academicFaculty.validation"

const router = express.Router()
router.post('/create-academic-faculty' , reqValidation(AcademicFacultyValidations.createAcademicFacultyValidationSchema) , asyncHandler(academicFacultyControllers.createAcademicFaculty))
router.get('/' , asyncHandler(academicFacultyControllers.getAcademicFaculty))
router.get('/:academicFacultyId' , asyncHandler(academicFacultyControllers.getSingleAcademicFaculty))
router.patch('/:academicFacultyId' , reqValidation(AcademicFacultyValidations.updateAcademicFacultyValidationSchema) , asyncHandler(academicFacultyControllers.updateSingleAcademicFaculty))
export const academicFacultyRoutes = router