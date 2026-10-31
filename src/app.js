import express from "express";
import cors from "cors";
import { globalErrorHandler } from "./lib/error/error.handler.js";
import "./lib/db/mongoose.js";
import { router } from "./route.js";
import { correlationId } from "./pkg/correlation/correlation-id.js";
import cookieParser from "cookie-parser";

const createApp = () => {
    const app = express();

    app.use(cors({
        origin: "http://localhost:4200",
        credentials: true
    }));

    app.use('/uploads', express.static('uploads'));

    app.use(express.json());

    app.use(cookieParser());

    app.use(correlationId);

    app.use("/api", router);

    app.use(globalErrorHandler);

    return app;
};

export { createApp };
