import Message from "../model/message.model.js";

const createMessage = async (content, receiver, sender) => {
    return Message.create({
        content: content,
        receiver: receiver,
        sender: sender
    });
};

const getAllMessages = async (userId) => {
    return Message.find(
        { receiver: userId, isDeleted: false },
        {},
        {
            populate: [{ path: "sender", select: "name _id" }],
            sort: { createdAt: -1 },
            limit: 100,
            skip: 0
        }
    );
};

const deleteMessage = async (id, userId) => {
    return Message.updateOne(
        {
            _id: id,
            receiver: userId
        },
        { isDeleted: true }
    );
};

export{
    createMessage,
    getAllMessages,
    deleteMessage
}