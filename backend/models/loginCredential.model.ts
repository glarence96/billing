import mongoose from "mongoose"
import { ILoginCredential } from "../helpers/interfaces";
  
const LoginCredentialSchema = new mongoose.Schema ({
    username: String,
    hash: String,
    salt: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: Number
});

const LoginCredential = mongoose.model<ILoginCredential>('LoginCredential', LoginCredentialSchema);
export default LoginCredential;