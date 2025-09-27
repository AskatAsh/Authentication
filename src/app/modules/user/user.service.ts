import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/appError";
import { AuthProvider, IAuthProvider, IUser } from "./user.interface";
import User from "./user.model";

// service function to create user
const createUser = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload;

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "This user already exists.");
    }

    const salt = await bcryptjs.genSalt(10);

    const hashedPassword = await bcryptjs.hash(password as string, salt);

    const authProvider: IAuthProvider = { provider: AuthProvider.CREDENTIAL, providerId: email as string };

    const user = await User.create({
        email,
        password: hashedPassword,
        auths: [authProvider],
        ...rest
    });

    return user;
}

// service function to get all users
const getAllUsers = async () => {

    const users = await User.find({});

    const totalUsers = await User.countDocuments();

    return {
        users,
        meta: {
            total: totalUsers
        }
    };
}

export const UserServices = {
    createUser,
    getAllUsers
}