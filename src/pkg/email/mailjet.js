import Mailjet from "node-mailjet";

class MailjetProvider {
    client
    fromEmail
    fromName

    constructor(config) {
        this.client = new Mailjet({
            apiKey: config.apiKey,
            apiSecret: config.apiSecret,
        });
        this.fromEmail = config.fromEmail;
        this.fromName = config.fromName;
    }

    async sendMail(to, subject, html) {
        this.client.post('send', {version: 'v3.1'}).request({
            Messages: [
                {
                    From: {
                        Email: this.fromEmail,
                        Name: this.fromName,
                    },
                    To: [
                        {
                            Email: to,
                        },
                    ],
                    Subject: subject,
                    HTMLPart: html
                },
            ],
        })
    }
}


export{
    MailjetProvider
}