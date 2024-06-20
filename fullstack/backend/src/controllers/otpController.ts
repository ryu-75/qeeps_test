import { Request, Response } from 'express';
import { OtpModel } from '../models/otpModel';
const otpGenerator = require('otp-generator');

export class OtpController {
    // Génère et envoie un OTP à l'email fourni
    async otp(req: Request, res: Response) {
        try {
            const { email }: { email: string } = req.body;

            // Vérifie si un OTP existe déjà pour l'email fourni
            const existingOpt = await OtpModel.findOne({ email });

            // Génère un OTP unique a 5 chiffres
            let otp = otpGenerator.generate(5, {
                upperCaseAlphabet: false,
                lowerCaseAlphabet: false,
                specialChars: false,
            });

            // Vérifie que l'OTP généré est unique dans la BD
            let result = await OtpModel.findOne({ otp });
            while (result) {
                otp = otpGenerator.generate(5, {
                    upperCaseAlphabet: false,
                    lowerCaseAlphabet: false,
                    specialChars: false,
                });
                result = await OtpModel.findOne({ otp });
            }

            // Met à jour l'OTP existant ou crée un nouvel enregistrement 
            if (existingOpt) {
                existingOpt.otp = otp;
                await existingOpt.save();       
            } else {
                const otpPayload = { email, otp };
                await OtpModel.create(otpPayload);   
            }
            
            // Renvoi une réponse réussie avec l'OTP
            return res.status(200).json({
                success: true,
                message: 'OTP sent successfully',
                otp,
            });
        } catch (e) {
            console.error((e as Error).message);
            // Retourne une réponse en cas d'erreur du serveur
            return res.status(500).json({ success: false, error: (e as Error).message });
        }
    }
}
