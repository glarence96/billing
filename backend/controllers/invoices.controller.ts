import { RequestHandler } from "express";
import { errorHandler, messages, responseHandler, statusCodes } from "../helpers/apiHelper";
import { IInvoice, IInvoiceItem } from "../helpers/interfaces";
import Invoice from "../models/invoice.model";

export const createInvoice: RequestHandler = async (req, res, next) => {
    try {
        await Invoice.create(req.body)
        req.invoice = req.body
        req.itemQtyInc = -1
        next()
    } catch (error) {
        errorHandler(res, next, error)
    }
}

export const getInvoices: RequestHandler = async (req, res, next) => {
    try {
        const findQuery = {$and: [
            {userId: req.user.userId},
            {status: 1},
            {createdAt:{$gte: req.query.startDate,$lt: req.query.startDate}}
        ]}        
        const invoices = await Invoice.find(findQuery)
        responseHandler(res, next, statusCodes.success, {invoices})
    } catch (error) {
        errorHandler(res, next, error)
    }
}