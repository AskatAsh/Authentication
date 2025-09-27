import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";

export const router = Router();

// array of routing objects with path and route
const moduleRoutes = [
    {
        path: '/user',
        route: UserRoutes
    }
]

// used Router().use() express middleware for routing
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})