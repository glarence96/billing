import mongoose from "mongoose"
import { PaymentStatus, IPurchaseOrder } from "../helpers/interfaces"

const PurchaseOrderItemSchema = new mongoose.Schema ({
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

const PurchaseOrderSchema = new mongoose.Schema ({
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor'
    },
    date: String,
    items: [PurchaseOrderItemSchema],
    amount: Number,
    tax: Number,
    totalAmt: Number,
    paymentStatus: PaymentStatus,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: Number
})

const PurchaseOrder = mongoose.model<IPurchaseOrder>('PurchaseOrder', PurchaseOrderSchema)
export default PurchaseOrder