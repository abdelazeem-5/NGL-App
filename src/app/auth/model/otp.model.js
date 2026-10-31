import { Schema , model } from "mongoose";

const otpSchema = new Schema({
    email: {type: String , require: true , trim: true},
    code: {type: String , require: true , length: 6},
    expiresAt: {type: Date , require: true , index: {expires : 0}}
},
{
    timestamps: {
        createdAt: true,
        updatedAt: true
    },
}
);


const Otp = model("Otp" , otpSchema);

export default Otp;

