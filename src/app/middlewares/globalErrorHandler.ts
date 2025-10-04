/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status-codes';
import { envVars } from "../config/env";
import AppError from "../errorHelpers/appError";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    let message = "Something went wrong!";

    const errorSources: any = [];

    // duplicate error
    if (error.code === 11000) {
        statusCode = httpStatus.BAD_REQUEST;
        const matchedArray = error.message.match(/"([^"]*)"/);
        message = `${matchedArray[1]} Already Exists.`
    }
    // cast error / objectId validation error
    else if (error.name === "CastError") {
        statusCode = httpStatus.BAD_REQUEST;
        message = "Invalid MongoDB ObjectId. Please Provide a Valid ID."
    }
    // validation error
    else if (error.name === "ValidationError") {
        const errors = Object.values(error.errors);

        errors.forEach((errorObject: any) => errorSources.push({
            path: errorObject.path,
            message: errorObject.message
        }));

        statusCode = httpStatus.BAD_REQUEST;
        message = "Validation Error Occured! Please Provide Valid Data."
    }
    else if (error instanceof AppError) {
        statusCode = error.statusCode;
        message = error.message;
    } else if (error instanceof Error) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = error.message;
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        error,
        stack: envVars.NODE_ENV === "development" ? error.stack : null
    })
}