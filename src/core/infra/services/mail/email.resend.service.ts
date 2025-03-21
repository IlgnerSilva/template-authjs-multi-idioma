import { Resend } from "resend"
import type { IEmailService } "@/core/domain/services/email.service.interface"

export class EmailService implements IEmailService{
    private readonly resend: Resend

    constructor(){
        this.resend = new Resend(process.env.RESEND_API_KEY)
    }

    async sendEmail(to: [string], subject: string, body: string): Promise<void> {
        this.resend.emails.send({
            from: "james.madison@examplepetstore.dev",
            to,
            subject,
            html: body
        })
    }
    
}