import bcryptjs from 'bcryptjs';
import httpStatus from 'http-status-codes';
import AppError from "../../errorHelpers/appError";
import { getAuthTokens } from '../../utils/getAuthTokens';
import { IUser } from "../user/user.interface";
import User from "../user/user.model";

const credentialsLogin = async (payload: Partial<IUser>) => {

    const { email, password } = payload;

    const isUserExist = await User.findOne({ email }).select("+password");

    if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "This User Does Not Exist.");
    }

    const isPasswordMatched = await bcryptjs.compare(password as string, isUserExist.password as string);

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password.");
    }

    const { accessToken, refreshToken } = getAuthTokens(isUserExist);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pass, ...rest } = isUserExist.toObject();

    return {
        accessToken,
        refreshToken,
        user: rest
    }
};

export const AuthServices = {
    credentialsLogin
}