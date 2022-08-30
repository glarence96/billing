import { Router } from "express";
import { crudConstructor } from "../helpers/apiHelper";
import Customer from "../models/customer.model";

const customersRouter = Router()

crudConstructor({
    router: customersRouter,
    routerName: 'customer',
    Model: Customer,
    existingField: 'name',
    required: [1, 1, 1, 1]
})

export default customersRouter