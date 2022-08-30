import { Router } from "express";
import { crudConstructor } from "../helpers/apiHelper";
import Purchase from "../models/purchase.model";

const purchasesRouter = Router()

crudConstructor({
    router: purchasesRouter,
    routerName: 'purchase',
    Model: Purchase,
    existingField: 'name',
    required: [0, 1, 0, 1]
})

export default purchasesRouter