import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.routes";
import { userRoutes } from "../modules/user/user.route";
import { academicSemesterRoutes } from "../modules/academicSemister/academicSemester.route";
import { academicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { academicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";

const router = Router()

const moduleRoutes = [
    {
        path:"/students",
        route:StudentRoutes
    },
    {
        path:"/users",
        route:userRoutes
    },
    {
        path:"/academic-semesters",
        route:academicSemesterRoutes
    },
    {
        path:'/academic-faculties',
        route:academicFacultyRoutes
    },
    {
        path:'/academic-departments',
        route:academicDepartmentRoutes
    }
]

moduleRoutes.forEach(route => router.use(route.path , route.route))

export const allRoutes = router