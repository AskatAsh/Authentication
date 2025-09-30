import { NextFunction, Request, Response } from "express";
import { JwtPayload } from 'jsonwebtoken';
import { envVars } from "../config/env";
import AppError from "../errorHelpers/appError";
import { Role } from "../modules/user/user.interface";
import { verifyToken } from "../utils/jwt";

export const verifyUser = (...userRoles: (keyof typeof Role)[]) => async (req: Request, res: Response, next: NextFunction) => {

    try {
        const accessToken = req.headers.authorization;

        if (!accessToken) {
            throw new AppError(403, "Missing Access Token.");
        }

        const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload;

        if (!userRoles.includes(verifiedToken.role)) {
            throw new AppError(403, "You Are Not Permitted To Access This Route.");
        }

        req.user = verifiedToken;

        next();
    } catch (error) {
        next(error);
    }
}