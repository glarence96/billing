import mongoose from "mongoose"
import { IEstimate, EstimateStatus } from "../helpers/interfaces"

const EstimateItemSchema = new mongoose.Schema ({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    name: String,
    quantity: Number,
    price: Number,
    discount: Number,
    amount: Number
})

const EstimateSchema = new mongoose.Schema ({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    date: String,
    items: [EstimateItemSchema],
    amount: Number,
    tax: Number,
    totalAmt: Number,
    estimateStatus: EstimateStatus,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: Number
})

const Estimate = mongoose.model<IEstimate>('Estimate', EstimateSchema)
export default Estimate