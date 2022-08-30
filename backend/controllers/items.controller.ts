import { RequestHandler } from "express";
import Item from "../models/item.model";
import { errorHandler, messages, responseHandler, statusCodes } from "../helpers/apiHelper";

export const getItems: RequestHandler = async (req, res, next) => {
    try {
        const items = await Item.find({$and: [{userId: req.user.userId}, {status: 1}]})
        if(items.length == 0) return responseHandler(res, next, statusCodes.success, messages.itemsNE)
        responseHandler(res, next, statusCodes.success, {items})
    } catch (error) {
        errorHandler(res, next, error)
    }
}

export const searchItems: RequestHandler = async (req, res, next) => {
    try {
        const items = await Item.find({$and: [
            {userId: req.user.userId},
            {name: {$regex: req.query.q, $options : 'i'}},
            {status: 1}
        ]})
        if(items.length == 0) return responseHandler(res, next, statusCodes.success, messages.itemsNE)
        const resItems = items.map((item) => ({name: item.name, itemId: item._id}))
        responseHandler(res, next, statusCodes.success, {items: resItems})
    } catch (error) {
        errorHandler(res, next, error)
    }
}

export const updateItemsQuantity: RequestHandler = async (req, res, next) => {
    try {
        const items = req.invoice.items
        const updatedItems = []
        console.log(items)
        for (let i = 0; i < items.length; i++) {
            const updatedItem = await Item.findByIdAndUpdate(
                items[i].itemId,
                {$inc: {quantity: req.itemQtyInc * items[i].quantity}},
                {new: true}
            )
            updatedItems.push(updatedItem)
            if(i == items.length - 1) responseHandler(res, next, statusCodes.success, {updatedItems})
        }
        if(items.length == 0) responseHandler(res, next, statusCodes.success)
    } catch (error) {
        errorHandler(res, next, error)
    }
}

// export const createItem: RequestHandler = async (req, res, next) => {
//     try {
//         const existingItem = await Item.findOne({$and: [{name: req.body.name}, {status: 1}]})
//         if(existingItem) {
//             return responseHandler(res, next, statusCodes.invalid, messages.itemAE)
//         }
//         await Item.create({...req.body, userId: req.user.userId})
//         responseHandler(res, next, statusCodes.success)
//     } catch (error) {
//         errorHandler(res, next, error)
//     }
// }

// export const getItem: RequestHandler = async (req, res, next) => {
//     try {
//         const item = await Item.findById(req.params.itemId)
//         if(!item) return responseHandler(res, next, statusCodes.invalid, messages.itemNE)
//         responseHandler(res, next, statusCodes.success, item)
//     } catch (error) {
//         errorHandler(res, next, error)
//     }
// }

// export const updateItem: RequestHandler = async (req, res, next) => {
//     try {
//         const item = await Item.findByIdAndUpdate(req.body.itemId, req.body.item)
//         if(!item) return responseHandler(res, next, statusCodes.invalid, messages.itemNE)
//         responseHandler(res, next, statusCodes.success)
//     } catch (error) {
//         errorHandler(res, next, error)
//     }
// }

// export const deleteItem: RequestHandler = async (req, res, next) => {
//     try {
//         const item = await Item.findByIdAndUpdate(req.params.itemId, {status: 0})
//         if(!item) return responseHandler(res, next, statusCodes.invalid, messages.itemNE)
//         responseHandler(res, next, statusCodes.success)
//     } catch (error) {
//         errorHandler(res, next, error)
//     }
// }