import * as messageService from "../service/message.service.js";

const sendMessage = async (req, res, next) => {
    try {
        const { content, receiver } = req.body;
        const sender = req.user?.id;

        await messageService.sendMessage(content, receiver, sender);

        res.json({
            message: "sent message successsfully",
            success: true
        });
    } catch (error) {
        next(error);
    }
};

const getAllMessage = async (req, res, next) => {
    try {
        console.log("Current user:", req.user);
        const messages = await messageService.getAllMessages(req.user.id);

        res.json({
            message: "OK",
            success: true,
            data: messages
        });
    } catch (error) {
        next(error);
    }
};

const deletemessage = async (req, res, next) => {
    try {
        const { id } = req.params;

        await messageService.deleteMessage(id, req.user.id);

        res.json({
            message: "message deleted successfully",
            success: true,
        });
    } catch (error) {
        next(error);
    }
};

export {
    sendMessage,
    getAllMessage,
    deletemessage
};
