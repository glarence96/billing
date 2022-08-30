import { Router } from "express";
import { crudConstructor } from "../helpers/apiHelper";
import Estimate from "../models/estimate.model";

const estimatesRouter = Router()

crudConstructor({
    router: estimatesRouter,
    routerName: 'estimate',
    Model: Estimate,
    existingField: 'name',
    required: [1, 1, 1, 1]
})

export default estimatesRouter