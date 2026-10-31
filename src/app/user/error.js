import AppError from "../../lib/error/error.js";

const userAlreadyExists = new AppError("User already exists", 409);
const userNotExist = new AppError("User not exist", 404);
const userAlreadyVerified = new AppError("User already verified", 400);
const userNotVerified = new AppError("User not verified", 400);




export{
    userAlreadyExists,
    userNotExist,
    userAlreadyVerified,
    userNotVerified
}