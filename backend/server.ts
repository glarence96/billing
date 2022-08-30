import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRouter from "./routers/users.router";
import authRouter from "./routers/auth.router";
import { isLoggedIn } from "./controllers/auth.controller";
import itemsRouter from "./routers/items.router";
import invoicesRouter from "./routers/invoices.router";

dotenv.config();

const app=express();
const port=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
if(uri) mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.use('/auth', authRouter)
app.use('/register', usersRouter)

app.use('/items', isLoggedIn, itemsRouter)
app.use('/invoices', isLoggedIn, invoicesRouter)

app.listen(port, ()=>{
  console.log(`Server is running on port: ${port}`);
});