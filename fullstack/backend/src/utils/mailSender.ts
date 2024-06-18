const nodemailer = require('nodemailer');

const mailSender = async (email: string, title: string, body: string): Promise<void> => {
    try {
        let transporter = nodemailer.createTransporter({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'sasha.lorion@gmail.com',
                pass: 'uryuU94800@_',
            },
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