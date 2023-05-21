

import nodemailer from "nodemailer";
import {apiUrl, mailerHost, mailerPass, mailerPort, mailerUser} from "../config";

class MailRepo {
    private transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: mailerHost,
            port: mailerPort,
            secure: false,
            auth: {
                user: mailerUser,
                pass: mailerPass,
            },
        });
    }

    public async sendActivationMail(to: string, link: string): Promise<void> {
        await this.transporter.sendMail({
            from: mailerUser,
            to,
            subject: "Activate with " + apiUrl,
            text: "",
            html: `
                    <div>
                        <h1>Activate account with this link</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `,
        });
    }

    public async sendPassword(to: string, password: string, link: string): Promise<void> {
        await this.transporter.sendMail({
            from: mailerUser,
            to,
            subject: "Активация аккаунта на " + apiUrl,
            text: "",
            html: `
           <div>
               <h1>email: ${to}</h1>
               <h1>password: ${password}</h1>
               <a href="${link}">${link}</a>
           </div>
                `,
        });
    }
}

export default MailRepo;
