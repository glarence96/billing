import mongoose from "mongoose";
import { IItem } from "../helpers/interfaces";

const ItemSchema = new mongoose.Schema ({
    name: String,
    buyPrice: Number,
    sellPrice: Number,
    taxSlab: Number,
    tax: Number,
    buyAmount: Number,
    discountPercentage: Number,
    discount: Number,
    sellAmount: Number,
    quantity: Number,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: Number
})

const Item = mongoose.model<IItem>('Item', ItemSchema)
export default Item