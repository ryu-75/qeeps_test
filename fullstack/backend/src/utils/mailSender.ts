const nodemailer = require('nodemailer');

// Fonction asynchrone pour envoyer un email
const mailSender = async (email: string, title: string, body: string): Promise<void> => {
    try {
        // Création du transporteur Nodemailer pour envoyer l'email
        let transporter = nodemailer.createTransporter({
            host: 'localhost',
            port: 25,
            secure: false,
            tls: {
                rejectUnauthorized: false
            }
        });

        // Envoi de l'email
        let info = await transporter.sendMail({
            from: 'www.sandeepdev.me - Sandeep Singh', // Expéditeur
            to: email,  // Destinataire
            subject: title, // Sujet de l'e-mail
            html: body, // Corps de l'e-mail en HTML
        });
        
        console.log("Email info: ", info);
        return info;
    } catch (e: any) {
        console.error("Error: ", e.message);
    }
};

export default mailSender;