import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const generateToken = (payload: JwtPayload, secret: string, expiresIn: string) => {
    const options = { expiresIn: expiresIn } as SignOptions;
    const token = jwt.sign(payload, secret, options);
    return token;
}

export const verifyToken = (accessToken: string, secret: string) => {
    const verifiedToken = jwt.verify(accessToken, secret);
    return verifiedToken;
}