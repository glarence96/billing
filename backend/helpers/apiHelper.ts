import { NextFunction, Request, RequestHandler, Response, Router } from "express"
import mongoose from "mongoose"

export const errorHandler = (res: Response, next: NextFunction, error: unknown) => {
    res.status(500).send({message: "Error", error})
    return next()
}

export const responseHandler = (res: Response, next: NextFunction, code: number, message?: string | Object) => {
    res.status(code)
    .send(
        message ? (typeof message == "string" ? {message} : message)
        : {message: getMessage(code)}
    )
    return next()
}

export const statusCodes = {
    success: 200,
    unauthorized: 401,
    invalid: 422,
    error: 500
}

export const messages = {
    success: "Success",
    unauthorized: "Unauthorized",
    invalid: "Invalid request",
    error: "Unknown error",
    wrongPwd: "Wrong password",
    userAE: "User already exists",
    userNE: "User does not exist",
    itemAE: "Item already exists",
    itemNE: "Item does not exist",
    itemsNE: "No items found"
}

const getMessage = (code: number) => {
    switch (code) {
        case statusCodes.success:
            return messages.success

        case statusCodes.error:
            return messages.error

        case statusCodes.invalid:
            return messages.invalid

        case statusCodes.unauthorized:
            return messages.unauthorized
    
        default:
            return messages.invalid
    }
}

interface crudParam {
    router: Router,
    routerName: string,
    Model: mongoose.Model<any>,
    existingField: string,
    required: number[]
}

export const crudConstructor = (crudParam: crudParam) => {
    const {router, routerName, Model, existingField, required} = crudParam

    const createApi: RequestHandler = async (req, res, next) => {
        console.log('****Creating******')
        try {
            const existingChecker = {}
            // @ts-ignore
            existingChecker[`${existingField}`] = req.body[`${existingField}`]
            const findQuery = {$and: [existingChecker, {status: 1}]}

            const existingItem = await Model.findOne(findQuery)
            if(existingItem) {
                return responseHandler(
                    res, next, statusCodes.invalid,
                    // @ts-ignore
                    messages[`${routerName}AE`] ? messages[`${routerName}AE`] : messages.itemAE
                )
            }
            const newItem = await Model.create({...req.body, userId: req.user.userId})
            responseHandler(res, next, statusCodes.success, newItem)
        } catch (error) {
            errorHandler(res, next, error)
        }
    }

    const getApi: RequestHandler = async (req, res, next) => {
        console.log('****Reading******')
        try {
            const item = await Model.findById(req.params.id)
            if(!item) return responseHandler(
                res, next, statusCodes.invalid,
                // @ts-ignore
                messages[`${routerName}NE`] ? messages[`${routerName}NE`] : messages.itemNE
            )
            responseHandler(res, next, statusCodes.success, item)
        } catch (error) {
            errorHandler(res, next, error)
        }
    }

    const updateApi: RequestHandler = async (req, res, next) => {
        console.log('****Updating******')
        try {
            const item = await Model.findByIdAndUpdate(req.body.id, req.body[routerName], {new: true})
            if(!item) return responseHandler(
                res, next, statusCodes.invalid,
                // @ts-ignore
                messages[`${routerName}NE`] ? messages[`${routerName}NE`] : messages.itemNE
            )
            responseHandler(res, next, statusCodes.success, item)
        } catch (error) {
            errorHandler(res, next, error)
        }
    }

    const deleteApi: RequestHandler = async (req, res, next) => {
        console.log('****Deleting******')
        try {
            const item = await Model.findByIdAndUpdate(req.params.id, {status: 0}, {new: true})
            if(!item) return responseHandler(
                res, next, statusCodes.invalid,
                // @ts-ignore
                messages[`${routerName}NE`] ? messages[`${routerName}NE`] : messages.itemNE
            )
            responseHandler(res, next, statusCodes.success, item)
        } catch (error) {
            errorHandler(res, next, error)
        }
    }

    if(required[0]) router.post(`/${routerName}`, createApi)
    if(required[1]) router.get('/:id', getApi)
    if(required[2]) router.patch(`/${routerName}`, updateApi)
    if(required[3]) router.delete('/:id', deleteApi)
}