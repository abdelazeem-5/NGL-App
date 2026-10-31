import { config } from "dotenv";
import { z } from "zod";

config();

const schema = z.object({
  PORT: z.coerce.number().default(3000),
  MONGODB_URL: z.string().trim(),
  JWT_SECRET: z.string().trim(),

  EMAIL_USER: z.string().trim().toLowerCase(),
  EMAIL_PASS: z.string(),

  GOOGLE_CLIENT_ID: z.string().trim(),

  REDIS_HOST: z.string().trim(),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_PASS: z.string().trim(), 

  MAILJET_API_KEY: z.string().trim(),
  MAILJET_API_SECRET: z.string().trim(),
  MAILJET_FROM_EMAIL: z.string().trim(), 
  MAILJET_FROM_NAME: z.string().trim(),  
});

const parsed = schema.parse(process.env);

export const env = {
  port: parsed.PORT,
  db: { url: parsed.MONGODB_URL },
  google: { webClientId: parsed.GOOGLE_CLIENT_ID },
  redis: {
    host: parsed.REDIS_HOST,
    port: parsed.REDIS_PORT,
    password: parsed.REDIS_PASS,
  },
  nodemailer: {
    user: parsed.EMAIL_USER,
    password: parsed.EMAIL_PASS,
  },
  jwt: { secret: parsed.JWT_SECRET },
  mailjet: {
    apiKey: parsed.MAILJET_API_KEY,
    apiSecret: parsed.MAILJET_API_SECRET,
    fromEmail: parsed.MAILJET_FROM_EMAIL,
    fromName: parsed.MAILJET_FROM_NAME,
  },
};