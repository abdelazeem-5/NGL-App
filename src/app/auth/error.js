import AppError from "../../lib/error/error.js";

const invalidOTP = new AppError("Invalid OTP", 400);
const otpExpired = new AppError("OTP expired , please request a new OTP", 400);
const invalidPassword = new AppError("Invalid password", 400);


export{
    invalidOTP,
    otpExpired,
    invalidPassword
}