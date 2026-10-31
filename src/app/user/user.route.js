import { uploadSingleFile, uploadFilesArray } from "../../pkg/media/multer.js";
import { allowedFields, fileValidation } from "../../pkg/media/file.validation.js";
import { authGurad } from "../../lib/auth/guard.js";
import * as userController from "./controller/user.controller.js";
import express from "express";

import {
    createUser,
    updateUser,
    findUserByEmail,
} from "./controller/user.controller.js";

const userRouter = express.Router();


userRouter.post("/register", createUser);
userRouter.patch("/", updateUser);
userRouter.get("/", findUserByEmail);


userRouter.post(
    "/upload-profile-pic",
    authGurad,
    uploadSingleFile("pp" , allowedFields.images),
    fileValidation(),
    userController.uploadProfilePic
);

userRouter.post(
    "/upload-cv",
    uploadSingleFile("cv", allowedFields.files),
    fileValidation(allowedFields.files),
    (req, res, next) => {
        res.json("ok");
    }
);

userRouter.post(
    "/upload-cover-images",
    uploadFilesArray("cover-images", 3),
    (req, res, next) => {
        console.log(req.files);
        res.json("ok cover image");
    }
);


export default userRouter;
