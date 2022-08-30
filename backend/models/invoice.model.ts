import mongoose from "mongoose"
import { IInvoice, PaymentStatus } from "../helpers/interfaces"

const InvoiceItemSchema = new mongoose.Schema ({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    quantity: Number
}, {_id: false})

const InvoiceSchema = new mongoose.Schema ({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    date: String,
    items: [InvoiceItemSchema],
    amount: Number,
    tax: Number,
    totalAmt: Number,
    paymentStatus: {
        type: String,
        enum: Object.values(PaymentStatus)
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: Number
})

const Invoice = mongoose.model<IInvoice>('Invoice', InvoiceSchema)
export default Invoice