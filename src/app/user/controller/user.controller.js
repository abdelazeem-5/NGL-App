import * as userService from "../service/user.service.js";


const createUser = async (req , res , next) => {
    try{
        const {name , email , provider} = req.body;
        const user = await userService.createUser(name , email , provider)
        res.status(201).json(
            {   message: "user created successfully",
                success: true,
                data: user})
    }
    catch(error){
        next(error);
    }
};


const updateUser = async (req , res , next) => {
    try{
        const {email} = req.body;
        const user = await userService.updateUser(email)
        res.status(200).json(
            {   message: "user updated successfully",
                success: true,
                data: user})
    }
    catch(error){
        next(error);
    }
};


const findUserByEmail = async (req , res , next) => {
    try{
        const {email} = req.query;
        const user = await userService.findUserByEmail(email)
        res.status(200).json(
            {   message: "user found successfully",
                success: true,
                data: user})
    }
    catch(error){
        next(error);
    }
};



const uploadProfilePic = async (req, res, next) => {
    try {
        await userService.uploadProfilePic(req.user.id, req.file);
        res.json({message: "upload profile successfully.", success: true});
    } catch (error) {
        next(error)
    }
}
export {
    createUser,
    updateUser,
    findUserByEmail,
    uploadProfilePic
};