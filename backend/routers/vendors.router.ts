import { Router } from "express";
import { crudConstructor } from "../helpers/apiHelper";
import Vendor from "../models/vendor.model";

const vendorsRouter = Router()

crudConstructor({
    router: vendorsRouter,
    routerName: 'vendor',
    Model: Vendor,
    existingField: 'name',
    required: [1, 1, 1, 1]
})

export default vendorsRouter