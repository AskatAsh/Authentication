import { IUser } from "./user.interface";
import User from "./user.model";

// service function to create user
const createUser = async (payload: Partial<IUser>) => {
    const { name, email } = payload;

    const user = await User.create({ name, email });

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