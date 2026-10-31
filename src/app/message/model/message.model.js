
import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    content: {type: String , require: true , minlength: 1 , maxlength: 200 , trim: true},
    sender: {type: Schema.Types.ObjectId , ref: "User"},
    receiver: {type: Schema.Types.ObjectId , ref: "User" , require: true },
    isDeleted: {type: Boolean , default: false}
},
{
    timestamps: {
        createdAt: true,
        updatedAt: true
    },
}
);

const Message = model("Message" , messageSchema);

export default Message;