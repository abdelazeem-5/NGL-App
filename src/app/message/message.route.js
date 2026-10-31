import express from "express";
import { authGurad } from "../../lib/auth/guard.js";

import {
    sendMessage,
    getAllMessage,
    deletemessage
} from "./controller/message.controller.js";


const messageRouter = express.Router();

messageRouter.post("/anonymous", sendMessage);
messageRouter.post("/public", authGurad, sendMessage);
messageRouter.get("/", authGurad, getAllMessage);
messageRouter.delete("/:id", authGurad, deletemessage);

export default messageRouter;