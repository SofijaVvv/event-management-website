import nodemailer from 'nodemailer';
import nodemailerHtmlToText from 'nodemailer-html-to-text';


async function sendMail(email_to: string, email_subject: string, email_text: string, generatedQRCode: string) {
    const transporter = nodemailer.createTransport({
        service: 'mail.genije.me',
        host: 'mail.genije.me',
        port: 465,
        auth: {
            user: 'no-reply@genije.me',
            pass: 'rogrin-qyhJap-mohqo4'
        }
    });

    transporter.use('compile', nodemailerHtmlToText.htmlToText());
    const html = `${email_text}`
    const mailOptions = {
        from: 'no-reply@genije.me',
        to: email_to,
        subject: email_subject,
        // text: email_text,
        html: html
    };
    console.log('email poruka', email_text)

    return transporter.sendMail(mailOptions)
        .then(info => {
            console.log('info', info);
            return {error: false, message: "Mail sent"};
        })
        .catch(error => {
            console.log('error', error)
            return {error: true, info: error};
        }).finally(() => {
            transporter.close();
        });
}


export default sendMail;
