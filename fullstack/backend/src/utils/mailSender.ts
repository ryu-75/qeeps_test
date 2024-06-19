const nodemailer = require('nodemailer');

const mailSender = async (email: string, title: string, body: string): Promise<void> => {
    try {
        let transporter = nodemailer.createTransporter({
            host: 'localhost',
            port: 25,
            secure: false,
            tls: {
                rejectUnauthorized: false
            }
        });
        let info = await transporter.sendMail({
            from: 'www.sandeepdev.me - Sandeep Singh',
            to: email,
            subject: title,
            html: body,
        });
        console.log("Email info: ", info);
        return info;
    } catch (e: any) {
        console.error("Error: ", e.message);
    }
};

export default mailSender;