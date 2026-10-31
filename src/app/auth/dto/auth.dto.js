import {z} from "zod";

const registerDTO = z.object({
    email: z.email().toLowerCase().trim(),
    name: z.string().min(2).max(20).trim(),
    password: z.string().min(8).max(16).trim(),
    dob: z.date().optional(),
    gender: z.enum(["male", "female"]).optional(),
});

const verifyAccountDTO = z.object({
    email: z.email().toLowerCase().trim(),
    code: z.string().length(6).trim(),
});


const loginDTO = z.object({
    email: z.email().toLowerCase().trim(),
    password: z.string().min(8).max(16).trim(),
});


const sendOtpDTO = z.object({
    email: z.email().toLowerCase().trim(),
});


const resetPasswordDTO = z.object({
    email: z.email().toLowerCase().trim(),
    code: z.string().length(6).trim(),
    newPassword: z.string().min(8).max(16).trim(),
});

export{
    registerDTO,
    verifyAccountDTO,
    loginDTO,
    sendOtpDTO,
    resetPasswordDTO
}