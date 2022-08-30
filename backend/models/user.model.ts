import mongoose from "mongoose";
import { IUser } from "../helpers/interfaces";

const UserSchema = new mongoose.Schema ({
    name: String,
    email: String,
    status: Number
})

const User = mongoose.model<IUser>('User', UserSchema)
export default User