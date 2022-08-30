import { pbkdf2, pbkdf2Sync, randomBytes } from "crypto";
import { RequestHandler } from "express";
import LoginCredential from "../models/loginCredential.model";
import User from "../models/user.model"
import { errorHandler, messages, responseHandler, statusCodes } from "../helpers/apiHelper";

export const createUser: RequestHandler = async (req, res, next) => {
    try {
        const {email, name, password} = req.body
        if(!email || !name || !password) {
            return responseHandler(res, next, statusCodes.invalid)
        }

        const existingUser = await User.findOne({email})
        if(existingUser) {
            return responseHandler(res, next, statusCodes.invalid, messages.userAE)
        }
        const newUser = await User.create({email, name, status: 1})
        const salt = randomBytes(128).toString('base64');
        const {HASH_ITERATIONS, HASH_KEYLEN, HASH_ALGO} = process.env;
        const hash = pbkdf2Sync(password, salt, parseInt(HASH_ITERATIONS!), parseInt(HASH_KEYLEN!), HASH_ALGO!)
        await LoginCredential.create({username: newUser.email, hash, salt, userId: newUser._id, status: 1})
        .then(() => responseHandler(res, next, statusCodes.success))
    } catch (error) {
        errorHandler(res, next, error)
    }
}