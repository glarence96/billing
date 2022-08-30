import { Router } from "express";
import { getItems, searchItems } from "../controllers/items.controller";
import { crudConstructor } from "../helpers/apiHelper";
import Item from "../models/item.model";

const itemsRouter = Router()

crudConstructor({
    router: itemsRouter,
    routerName: 'item',
    Model: Item,
    existingField: 'name',
    required: [1, 1, 1, 1]
})

// itemsRouter.post('/item', createItem)
// itemsRouter.get('/:itemId', getItem)
// itemsRouter.patch('/item', updateItem)
// itemsRouter.delete('/:itemId', deleteItem)

itemsRouter.get('/all', getItems)

itemsRouter.get('/', searchItems)

export default itemsRouter