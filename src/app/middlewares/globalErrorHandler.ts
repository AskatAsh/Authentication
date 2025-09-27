/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status-codes';
import { envVars } from "../config/env";
import AppError from "../errorHelpers/appError";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    let message = "Something went wrong!";

    if (error instanceof AppError) {
        statusCode = error.statusCode;
        message = error.message;
    } else if (error instanceof Error) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = error.message;
    }

    res.status(statusCode).json({
        success: false,
        message,
        error,
        stack: envVars.NODE_ENV === "development" ? error.stack : null
    })
}