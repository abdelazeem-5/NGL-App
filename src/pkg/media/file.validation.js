import { fileTypeFromBuffer } from "file-type";
import fs from "node:fs";
import AppError from "../../lib/error/error.js";

export const allowedFields = {
    images: ['image/png', 'image/jpeg'],
    files:  ['application/pdf', 'application/msword'],
    videos: ['video/mp4'],
    audios: ['audio/mp3'],
};

const fileValidation = (allowedTypes = allowedFields.images) => async (req, res, next) => {
    try {
        if (!req.file) {
            return next(new AppError("No file uploaded or invalid file type", 400));
        }

        if (req.file.size > 5 * 1024 * 1024) {
            throw new AppError('exceeded size allowed', 400);
        }

        const filePath = req.file.path;
        const buffer = fs.readFileSync(filePath);
        const type = await fileTypeFromBuffer(buffer);

        if (!type || !allowedTypes.includes(type.mime)) {
            fs.unlinkSync(filePath);
            return next(new AppError("Invalid file type", 400));
        }

        return next();
    } catch (error) {
        return next(error);
    }
};

export {
    fileValidation
};
