import { Router } from "express";
import { createInvoice } from "../controllers/invoices.controller";
import { updateItemsQuantity } from "../controllers/items.controller";
import { crudConstructor } from "../helpers/apiHelper";
import Invoice from "../models/invoice.model";

const invoicesRouter = Router()

crudConstructor({
    router: invoicesRouter,
    routerName: 'invoice',
    Model: Invoice,
    existingField: 'name',
    required: [0, 1, 0, 1]
})

invoicesRouter.post('/invoice', createInvoice, updateItemsQuantity)

export default invoicesRouter