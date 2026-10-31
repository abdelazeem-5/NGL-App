import nodemailer from 'nodemailer';
import { env } from "../config/env.js";

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: env.nodemailer.user,
            pass: env.nodemailer.password,
        },
    })


const sendEmail = async (to, subject, html) => {

    await transporter.sendMail({
    from: `"NGL App" <${env.nodemailer.user}>`,
    to: to,
    subject: subject,
    html: html
})
}


export {
    sendEmail,
}