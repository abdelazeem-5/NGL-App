import http from "http";
import { createApp } from "./app.js";
import { env } from "./lib/config/env.js";
import { logger } from "./pkg/logger/logger.js";


const app = createApp();
const server = http.createServer(app);

server.listen(env.port, () => {
    logger.info(`Server listening on ${env.port}`);
});

async function shutdown() {
    logger.info("shutdown requested");

    server.close(async () => {
        try {
            await db.destroy();
        } catch {}

        process.exit(0);
    });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);