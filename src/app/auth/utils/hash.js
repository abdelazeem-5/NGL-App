import bcrypt from "bcrypt";

const hashPassword = async (password) =>  {
    return await bcrypt.hash(password , 10)

}

const comparePassword = async (hashPassword , password) =>  {
    return await bcrypt.compare(hashPassword , password)

}

export{
    hashPassword,
    comparePassword
}