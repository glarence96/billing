import mongoose from "mongoose";
import { ICustomer } from "../helpers/interfaces";

const CustomerSchema = new mongoose.Schema ({
    name: String,
    gstNo: String,
    address: String,
    phone: String,
    email: String,
    amtToPay: Number,
    amtPaid: Number,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: Number
})

const Customer = mongoose.model<ICustomer>('Customer', CustomerSchema)
export default Customer