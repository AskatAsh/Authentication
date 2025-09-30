import { Router } from "express";
import { verifyUser } from "../../middlewares/verifyUser";
import { Role } from "../user/user.interface";
import { AuthControllers } from "./auth.controller";

const router = Router();

router.post('/login', AuthControllers.credentialsLogin);
router.post('/logout', AuthControllers.logout);
router.post('/refresh-token', AuthControllers.getNewAccessToken);
router.post('/reset-password', verifyUser(...Object.values(Role)), AuthControllers.resetPassword);

export const AuthRoutes = router;