import express from "express";
import { idImpotency } from "../../lib/idempotency/idempotency.js";

import {
    register,
    verifyAccount,
    login,
    sendOTP,
    resetPassword,
    loginWithGoogle
} from "./controller/auth.controller.js";


const authRouter = express.Router();

authRouter.post("/register" , register);
authRouter.patch("/verify-account" , verifyAccount);
authRouter.post("/login" , login);
authRouter.post("/send-otp" , sendOTP);
authRouter.patch("/reset-password", idImpotency() , resetPassword);
authRouter.post("/login-with-google" , loginWithGoogle);




export default authRouter;


