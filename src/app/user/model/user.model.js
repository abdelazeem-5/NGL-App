import { Schema , model} from "mongoose";


const userSchema = new Schema({
    name: {type: String , required: true , minlength: 3 , maxlength: 20 , trim: true},
    email: {type: String ,  required: true , unique: true , lowercase: true , trim: true},
    password: {type: String , required: function () {return (this.provider === "system");} , minlength: 6},
    provider: {type: String , enum: ["system" , "google"] , default: "system"},
    dob: {type: Date},
    isDeleted: {type: Boolean , default: false},
    isVerified: {type: Boolean , default: false},
    twoStepVerification: {type: Boolean, default: false},
    gender: {type: String, enum: ["male", "female"], default: "male"},
    profilePic: {type: String},
    coverImagePaths: [String],
    cvPath: String,
},

{
    timestamps: {
        createdAt: true,
        updatedAt: true
    },
}
); 


const User = model("User" , userSchema);

export default User;