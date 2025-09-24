/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import User from "./user.model";

const createUser = (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;

        const user = User.create({
            name, email
        })

        res.status(httpStatus.CREATED).json({
            success: true,
            message: "User created successfully!",
            user
        })

    } catch (error: any) {
        console.log(`Error: ${error.message}`);
        res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}

export const userControllers = {
    createUser
}