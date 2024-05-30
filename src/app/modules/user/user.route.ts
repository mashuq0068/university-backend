import express from "express"
import { userControllers } from "./user.controller"
import asyncHandler from "../../utils/asyncHandler"
import reqValidation from "../../middlewares/reqValidation"
// import { userValidationSchema } from "./user.validation"
import studentValidationSchema from "../student/student.validation"

const router = express.Router()
router.post('/create-student' , reqValidation(studentValidationSchema), asyncHandler( userControllers.createStudent))

export const userRoutes = router