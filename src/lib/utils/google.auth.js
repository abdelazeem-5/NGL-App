import { OAuth2Client } from "google-auth-library";
import AppError from "../../lib/error/error.js";
import { env } from "../config/env.js";

const client = new OAuth2Client();

const verifyGoogleToken = async (idToken) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: env.google.webClientId
        });

        return ticket.getPayload();
    } catch (error) {
        throw new AppError("Invalid Google token", 403);
    }
};

export { verifyGoogleToken };