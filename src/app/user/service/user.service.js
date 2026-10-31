import * as userRepository from "../repository/user.repository.js";
import {userAlreadyExists , userNotExist} from "../error.js";
import fs from 'node:fs';

const createUser = async (name , email , provider) => {
    const userExist = await userRepository.findUserByEmail(email);
    if(userExist){
        throw userAlreadyExists;
    }
    const user = await userRepository.createUser(name , email , provider)
    return user;
}

const updateUser = async (email) => {
    const userExist = await userRepository.findUserByEmail(email);
    if(!userExist){
        throw userNotExist;
    }
    const user = await userRepository.updateUser(email);
    return user;
};

const findUserByEmail = async (email) => {
    const user = await userRepository.findUserByEmail(email);
    return user;
};

const verifyAccount = async (email) => {
    const userExist = await userRepository.findUserByEmail(email);
    if(!userExist){
        throw userNotExist;
    }
    const user = await userRepository.updateUser(email);
    return user;
};

const loginUser = async (email) => {
    const userExist = await userRepository.findUserByEmail(email);
    if(!userExist){
        throw userNotExist;
    }
    return userExist;

};


const uploadProfilePic = async (userId, file) => {
  const user = await userRepository.findUserById(userId);
  if (!user) throw userNotExist;
if (user.profilePic && fs.existsSync(user.profilePic)) {fs.unlinkSync(user.profilePic);}

await userRepository.updateUserByEmail(user.email, {profilePic: file.path});
}



export {
    createUser,
    updateUser,
    findUserByEmail,
    verifyAccount,
    loginUser,
    uploadProfilePic
};
