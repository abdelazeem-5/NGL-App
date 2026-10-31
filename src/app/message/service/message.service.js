import { mailjetProvider } from "../../../lib/email/init.js";
import AppError from "../../../lib/error/error.js";
import { userNotExist } from "../../user/error.js";
import * as userRepository from "../../user/repository/user.repository.js";
import * as messageResitory from "../repository/message.repository.js";


const sendMessage = async(content, receiver, sender) => {
  const user = await userRepository.findUserById(receiver);
  if (!user) throw userNotExist;
  await messageResitory.createMessage(content, receiver, sender);
  await mailjetProvider.sendMail(
    user.email, "new Message",
    "<h3>check your account you receive a new message</h3>");
}


const getAllMessages = async (userId) => {
  return await messageResitory.getAllMessages(userId);
}


const deleteMessage = async (id, userId) => {
  const { modifiedCount, matchedCount } = await messageResitory.deleteMessage(id, userId);
  console.log(modifiedCount, matchedCount);

  if (modifiedCount === 0) throw new AppError('message not found', 404);
}


export{
    sendMessage,
    getAllMessages,
    deleteMessage
}