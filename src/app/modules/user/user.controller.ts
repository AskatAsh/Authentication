/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const user = await UserServices.createUser(req.body);

        res.status(httpStatus.CREATED).json({
            success: true,
            message: "User created successfully!",
            data: user
        })

    } catch (error: any) {
        console.log(`Error: ${error.message}`);
        res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}

export const UserControllers = {
    createUser
}