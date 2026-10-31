import * as authRepository from "../repository/auth.repository.js";
import {generateOTP} from "../../../lib/utils/otp.js";
import * as otpRepository from "../repository/otp.repository.js";
import {sendEmail} from "../../../lib/email/nodemailer.js";
import {userNotExist , userAlreadyExists , userAlreadyVerified , userNotVerified} from "../../user/error.js";
import {invalidOTP , otpExpired , invalidPassword} from "../error.js";
import {toMs} from "../../../pkg/utils/time.js";
import { generateToken } from "../utils/token.js";
import { hashPassword , comparePassword } from "../utils/hash.js";
import { verifyGoogleToken } from "../../../lib/utils/google.auth.js";
import { mailjetProvider } from "../../../lib/email/init.js";


const register = async ({ name, email, password }) => {
    const user = await authRepository.checkUserExistByEmail(email);
    if (user) {
        throw userAlreadyExists;
    }
    password = await hashPassword(password);
    const createdUser = await authRepository.register(name , email , password);
    await otpRepository.deleteOTPsByEmail(email);
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + toMs({time: 3 , unit: "minutes"}));    
    await otpRepository.createOtp(email , otp , expiresAt);
    // await sendEmail(email , "Verify code" , `<p>Your OTP is ${otp}</p>`);
    await mailjetProvider.sendMail(email , "Verify code" , `<p>Your OTP is ${otp}</p>`);
    return createdUser;
}


const verifyAccount = async (email , code) => {
    const user = await authRepository.checkUserExistByEmail(email);
    if (!user) {
        throw userNotExist;
    }
    if (user.isVerified === true) {
        throw userAlreadyVerified;
    }
    const otp = await otpRepository.getOtpByEmail(email);
    if (!otp) {
        throw otpExpired;
    }
    if (otp.code !== code) {
        throw invalidOTP;
    }
    await authRepository.updateUserByEmail(email);
    await otpRepository.deleteOTPsByEmail(email);
}


const login = async (email , password) => {
    const user = await authRepository.checkUserExistByEmail(email);
    if (!user) {
        throw userNotExist;
    }
    if (user.isVerified === false) {
        throw userNotVerified;
    }
    const match = await comparePassword(password , user.password);
    if (!match) {
        throw invalidPassword;
    }
    const token = generateToken({id: user.id , name: user.name});
    return {user, token};
}


const sendOTP = async (email) => {
    const user = await authRepository.checkUserExistByEmail(email);
    if (!user) {
        throw userNotExist;
    }
    await otpRepository.deleteOTPsByEmail(email);
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + toMs({time: 3 , unit: "minutes"}));
    await otpRepository.createOtp(email , otp , expiresAt);
    // await sendEmail(email , "Verify code" , `<p>Your OTP is ${otp}</p>`);
     
    // await sendEmail(
    await mailjetProvider.sendMail(
    email,
    "NGL App - Verification Code",
    `
    <div style="font-family: Arial, sans-serif; background: #f4f6fb; padding: 40px 20px;">
    <div style="max-width: 500px; margin: auto; background: white; padding: 35px; border-radius: 14px; text-align: center; box-shadow: 0 4px 14px rgba(0,0,0,0.06);">
        <h1 style="margin-bottom: 10px; color: #160ef5;">NGL App</h1>
        <p style="color: #555; font-size: 15px;">Your verification code is:</p>
        <div style="display: inline-block; background: #f0f2ff; color: #160ef5; font-size: 32px; font-weight: bold; letter-spacing: 10px; padding: 14px 22px; border-radius: 10px; margin: 20px 0;">
            ${otp}
        </div>
    </div>
</div>
    `
);
}


const resetPassword = async (email , code , newPassword) => {
    const otp = await otpRepository.getOtpByEmail(email);
    if(!otp){
        throw otpExpired;
    }
    if(otp.code !== code){
        throw invalidOTP;
    }
    const hashedPassword = await hashPassword(newPassword);
    await authRepository.updateUserByEmail(email , {password: hashedPassword});
    await otpRepository.deleteOTPsByEmail(email);
}



const loginWithGoogle = async (idToken) => {
    const payload = await verifyGoogleToken(idToken);

    const user = await authRepository.checkUserExistByEmail(payload.email);

    if (user) {
        return generateToken({
            id: user._id,
            email: user.email
        });
    }

    const createdUser = await authRepository.createUser({
        name: payload.name,
        email: payload.email,
        provider: "google",
        isVerified: true
    });

    return generateToken({
        id: createdUser._id,
        email: createdUser.email
    });
};


export{
    register,
    verifyAccount,
    login,
    sendOTP,
    resetPassword,
    loginWithGoogle
}

