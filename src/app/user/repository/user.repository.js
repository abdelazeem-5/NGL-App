import userModel from "../model/user.model.js";
const createUser = async (name , email , provider) => {
    const user = await userModel.create({name , email , provider})
    return user;
}

const updateUser = async (email) => {
    const user = await userModel.updateOne(
        {email},
        {isVerified: true}
    );
    return user;
};

const findUserByEmail = async (email) => {
    const user = await userModel.findOne({email});
    return user;
};

// const updateUserByEmail = async (email) => {
//     const user = await userModel.updateOne(
//         {email},
//         {isVerified: true},
//         {returnDocument: "after"}
//     );
//     return user;
// };


const updateUserByEmail = async (email, updateData) => {
    const user = await userModel.updateOne(
        {email},
        updateData
    );
    return user;
};


const findUserById = async (id) => {
    const user = await userModel.findById(id);
    return user;
};

export {
    createUser,
    updateUser,
    findUserByEmail,
    updateUserByEmail,
    findUserById
}
