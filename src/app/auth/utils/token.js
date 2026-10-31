import jwt from "jsonwebtoken";
import {toMs} from "../../../pkg/utils/time.js";

const generateToken = (payload) => {
        return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {expiresIn: toMs({time: 1 , unit: "hours"})}
    )
}

export{
    generateToken
}