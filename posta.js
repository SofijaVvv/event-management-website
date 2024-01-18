// instalirati nodemailer
// npm install nodemailer


const nodemailer = require('nodemailer');

async function posaljiMail(email_to, email_subject, email_text) {
    const transporter = nodemailer.createTransport({
        service: 'mail.genije.me',
        host: 'mail.genije.me',
        port: 465,
        auth: {
            user: 'no-reply@genije.me',
            pass: 'rogrin-qyhJap-mohqo4'
        }
    });

    const mailOptions = {
        from: 'no-reply@genije.me',
        to: email_to,
        subject: email_subject,
        text: email_text
    };

    return transporter.sendMail(mailOptions)
        .then(info => {
            // console.log('Email poslat uspjesno');
            return {error: false, info: "Mail poslat uspjesno"};
        })
        .catch(error => {
            // console.log('Email nije poslat');
            return {error: true, info: error};
        }).finally(() => {
            transporter.close();
        });


}
module.exports = posaljiMail;
