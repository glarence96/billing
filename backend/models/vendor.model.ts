import mongoose from "mongoose";
import { IVendor } from "../helpers/interfaces";

const VendorSchema = new mongoose.Schema ({
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

const Vendor = mongoose.model<IVendor>('Vendor', VendorSchema)
export default Vendor