import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.routes";
import { userRoutes } from "../modules/user/user.route";

const router = Router()

const moduleRoutes = [
    {
        path:"/students",
        route:StudentRoutes
    },
    {
        path:"/users",
        route:userRoutes
    }
]

moduleRoutes.forEach(route => router.use(route.path , route.route))

export const allRoutes = router