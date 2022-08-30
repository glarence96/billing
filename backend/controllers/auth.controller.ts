import { pbkdf2Sync } from "crypto";
import { RequestHandler } from "express";
import jsonwebtoken from "jsonwebtoken";
import LoginCredential from "../models/loginCredential.model";
import { errorHandler, messages, responseHandler, statusCodes } from "../helpers/apiHelper";

export const isLoggedIn: RequestHandler = async (req, res, next) => {
    if(!req.headers.authorization) {
        return responseHandler(res, next, statusCodes.unauthorized)
    }
    const decoded: any = jsonwebtoken.verify(req.headers.authorization.split(' ')[1], process.env.JWT_KEY!)
    if(decoded.userId) {
        req.user = {userId: decoded.userId}
        next()
    } else {
        return responseHandler(res, next, statusCodes.unauthorized)
    }
}

export const checkLogin: RequestHandler = async (req, res, next) => {
    try {
        const {username, password} = req.body
        if(!username || !password) {
            return responseHandler(res, next, statusCodes.invalid)
        }

        const loginCred = await LoginCredential.findOne({$and: [{username}, {status: 1}]})
        if(!loginCred) {
            return responseHandler(res, next, statusCodes.invalid, messages.userNE)
        }

        const {HASH_ITERATIONS, HASH_KEYLEN, HASH_ALGO} = process.env;
        const userHash = pbkdf2Sync(password, loginCred!.salt, parseInt(HASH_ITERATIONS!), parseInt(HASH_KEYLEN!), HASH_ALGO!)
        if(userHash.toString() == loginCred.hash) {
            const token = jsonwebtoken.sign({userId: loginCred.userId}, process.env.JWT_KEY!)
            responseHandler(res, next, statusCodes.success, {token})
        } else {
            responseHandler(res, next, statusCodes.invalid, messages.wrongPwd)
        }
    } catch (error) {
        errorHandler(res, next, error)
    }
}