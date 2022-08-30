import mongoose from "mongoose"

export interface IUser extends mongoose.Document {
    name: string,
    email: string,
    status: number
}

export interface ILoginCredential extends mongoose.Document {
    username: string,
    hash: string,
    salt: string,
    userId: mongoose.Types.ObjectId,
    status: number
}

export interface IItem extends mongoose.Document {
    name: string,
    buyPrice: number,
    sellPrice: number,
    taxSlab: number,
    tax: number,
    buyAmount: number,
    discountPercentage: number,
    discount: number,
    sellAmount: number,
    quantity: number,
    userId: mongoose.Types.ObjectId,
    status: number
}

export interface ICustomer extends mongoose.Document {
    name: string,
    gstNo?: string,
    address?: string,
    phone?: string,
    email?: string,
    amtToPay: number,
    amtPaid: number,
    userId: mongoose.Types.ObjectId,
    status: number
}

export interface IVendor extends mongoose.Document {
    name: string,
    gstNo?: string,
    address?: string,
    phone?: string,
    email?: string,
    amtToPay: number,
    amtPaid: number,
    userId: mongoose.Types.ObjectId,
    status: number
}

export enum PaymentStatus {
    paid = "Paid",
    notPaid = "Not paid"
}

export interface IInvoiceItem {
    itemId: mongoose.Types.ObjectId,
    quantity: number
}

export interface tax {
    taxSlab: number,

}

export interface IInvoice extends mongoose.Document {
    customerId: mongoose.Types.ObjectId,
    date: string,
    items: IInvoiceItem[],
    amount: number,
    discountPercentage: number,
    discount: number,
    taxes: tax[],
    totalAmt: number,
    paymentStatus: PaymentStatus,
    userId: mongoose.Types.ObjectId,
    status: number
}

export interface IPurchaseOrder extends Omit<IInvoice, 'customerId'> {
    vendorId: mongoose.Types.ObjectId
}

export enum EstimateStatus {
    accepted = "Accepted",
    pending = "Pending",
    closed = "Closed",
    rejected = "Rejected"
}

export interface IEstimateItem extends IInvoiceItem {}

export interface IEstimate extends Omit<IInvoice, 'paymentStatus'> {
    estimateStatus: EstimateStatus
}

export interface LoggedUser {
    userId: string
}