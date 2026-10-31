import { logger } from "../../pkg/logger/logger.js";


const globalErrorHandler = (err, req, res, _next) => {
    logger.error(err.message, { stack: err.stack , correlationId: req.correlationId });

    if (err.isOperational === true) {
        return res.status(err.statusCode).json({
            message: err.message,
            success: false,
        });
    }

    return res.status(500).json({
        message: "Something went wrong",
        success: false,
    });
};


const invalidRouter = (_req, _res, _next) => {
  throw new AppError('invalid router', 404);
}


export {
    globalErrorHandler,
    invalidRouter
};


