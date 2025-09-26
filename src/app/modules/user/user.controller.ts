/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";

// controller to create user
const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserServices.createUser(req.body);

        res.status(httpStatus.CREATED).json({
            success: true,
            message: "User created successfully!",
            data: user
        })

    } catch (error: any) {
        next(error);
    }
}

// controller to get all users
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const allUsers = await UserServices.getAllUsers();

        res.status(httpStatus.CREATED).json({
            success: true,
            message: "Got all users successfully!",
            data: allUsers
        })

    } catch (error: any) {
        next(error)
    }
}

export const UserControllers = {
    createUser,
    getAllUsers
}