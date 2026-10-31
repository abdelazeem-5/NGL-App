import multer, { diskStorage } from "multer";
import crypto from "node:crypto";

const multerUpload = (allowedTypes = ["image/jpeg", "image/png"]) => {
    return multer({
        fileFilter: (req, file, cb) => {

            if (!allowedTypes.includes(file.mimetype)) {
                return cb(null, false);
            }

            cb(null, true);
        },
        storage: diskStorage({
            destination: "uploads",
            filename: (req, file, cb) => {
                cb(null, `${crypto.randomUUID()}-${file.originalname}`);
            }
        })
    });
};

const uploadSingleFile = (filedName, allowedTypes = ["image/jpeg", "image/png"]) => {
    return multerUpload(allowedTypes).single(filedName);
};

const uploadFilesArray = (fieldName, maxCount) => {
    return multerUpload().array(fieldName, maxCount);
};

const uploadFields = (fields) => {
    return multerUpload().fields(fields);
};

export {
    uploadSingleFile,
    uploadFilesArray,
    uploadFields
};



