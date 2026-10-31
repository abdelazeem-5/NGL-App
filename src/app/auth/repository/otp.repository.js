import otpModel from "../model/otp.model.js";

const createOtp = async (email , code , expiresAt) => {
    const createdOtp = await otpModel.create({email , code , expiresAt});
    return createdOtp;
}


const getOtpByEmail = async (email) => {
    const otp = await otpModel.findOne({email});
    return otp;
}


const deleteOTPsByEmail = async (email) => {
    const deletedOtp = await otpModel.deleteMany({email});
    return deletedOtp;
}

export{
    createOtp,
    getOtpByEmail,
    deleteOTPsByEmail
}


