import * as authService from "../service/auth.service.js";
import {toMs} from "../../../pkg/utils/time.js";
import { validateBody } from "../../../lib/validation/validation.js";
import { registerDTO, verifyAccountDTO , loginDTO , sendOtpDTO , resetPasswordDTO } from "../dto/auth.dto.js";

const register = async (req , res , next) => {
    try{
        const data = validateBody(registerDTO , req.body);
        const createdUser = await authService.register(data);
        res.status(201).json({message: "user created successfully" , success: true , data: createdUser});
    }
    catch(error){
        next(error);
    }
}


const verifyAccount = async (req , res , next) => {
    try{
        const data = validateBody(verifyAccountDTO , req.body);
        const {email , code} = data;

        const updatedUser = await authService.verifyAccount(email , code);
        res.status(200).json({message: "user verified successfully" , success: true , data: updatedUser});
    }
    catch(error){
        next(error);
    }
}


const login = async (req , res , next) => {
    try{
        const data = validateBody(loginDTO , req.body);
        const {email , password} = data;

        const user = await authService.login(email , password);
        res.cookie("token" , user.token , {httpOnly: true , maxAge: toMs({time: 1 , unit: "hours"})});
        res.status(200).json({message: "user login successfully" , success: true , data: user});
    }
    catch(error){
        next(error);
    }
}


const sendOTP = async (req , res , next) => {
    try{
        const data = validateBody(sendOtpDTO , req.body);
        const {email} = data;
        await authService.sendOTP(email);
        res.status(200).json({message: "OTP sent successfully" , success: true});
    }
    catch(error){
        next(error);
    }
}


const resetPassword = async (req , res , next) => {
    try{
        const data = validateBody(resetPasswordDTO , req.body);
        const {email , code , newPassword} = data;
        await authService.resetPassword(email , code , newPassword);
        res.status(204).json({message: "password updated successfully" , success: true});
    }
    catch(error){
        next(error);
    }
}

const loginWithGoogle = async (req , res , next) => {
    try{
        const {idToken} = req.body;
        const user = await authService.loginWithGoogle(idToken);
        res.cookie("token" , user.token , {httpOnly: true , maxAge: toMs({time: 1 , unit: "hours"})});
        res.status(200).json({message: "user login with google successfully" , success: true});
    }
    catch(error){
        next(error);
    }
}


        


export{
    register,
    verifyAccount,
    login,
    sendOTP,
    resetPassword,
    loginWithGoogle
}





