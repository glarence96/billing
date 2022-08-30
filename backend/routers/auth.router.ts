import { Router } from "express";
import { checkLogin } from "../controllers/auth.controller";

const authRouter = Router()

authRouter.post('/login', checkLogin)

export default authRouter