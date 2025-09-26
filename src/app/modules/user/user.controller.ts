
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { UserServices } from "./user.service";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);

    res.status(httpStatus.CREATED).json({
        success: true,
        message: "User created successfully!",
        data: user
    })
})

// controller to create user - old way
// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const user = await UserServices.createUser(req.body);

//         res.status(httpStatus.CREATED).json({
//             success: true,
//             message: "User created successfully!",
//             data: user
//         })

//     } catch (error: any) {
//         next(error);
//     }
// }


// controller to get all users
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const allUsers = await UserServices.getAllUsers();

    res.status(httpStatus.OK).json({
        success: true,
        message: "Got all users successfully!",
        data: allUsers
    })
})

export const UserControllers = {
    createUser,
    getAllUsers
}