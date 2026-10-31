import authModel from "../../user/model/user.model.js";

const checkUserExistByEmail = async (email) => {
    const user = await authModel.findOne({email});
    return user;
     
}

const createUser = async (userData) => {
    const user = await authModel.create(userData);
    return user;
};


const register = async (name , email , password) => {
    const user = await authModel.create({name , email , password});
    return user;
};

const updateUserByEmail = async (email) => {
    const updatedUser = await authModel.updateOne(
        {email},
        {isVerified: true},
    );
    return updatedUser;
}





export{
    checkUserExistByEmail,
    createUser,
    register,
    updateUserByEmail
}