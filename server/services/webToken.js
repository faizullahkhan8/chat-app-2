import jwt from "jsonwebtoken";
import { JWT_SECTET_KEY } from "../config/env.config.js";
import tokenModel from "../database/models/token.model.js";

export const genToken = async (userId, expiryTime) => {
    return jwt.sign({ userId }, JWT_SECTET_KEY, { expiresIn: expiryTime });
};

export const verifyToken = async (TOKEN) => {
    return jwt.verify(TOKEN, JWT_SECTET_KEY);
};

export const storeToken = async (token, userId) => {
    try {
        await tokenModel.create({
            token,
            userId,
        });
    } catch (error) {
        return console.log(error);
    }
};
