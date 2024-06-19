import { Request, Response } from 'express';
import { OtpModel } from '../models/otpModel';
const otpGenerator = require('otp-generator');

export class OtpController {
    async otp(req: Request, res: Response) {
    try {
        const { email }: { email: string } = req.body;

        const existingOpt = await OtpModel.findOne({ email });

        let otp = otpGenerator.generate(5, {
            upperCaseAlphabet: false,
            lowerCaseAlphabet: false,
            specialChars: false,
        });

        let result = await OtpModel.findOne({ otp });
        while (result) {
            otp = otpGenerator.generate(5, {
                upperCaseAlphabet: false,
                lowerCaseAlphabet: false,
                specialChars: false,
            });
            result = await OtpModel.findOne({ otp });
        }

        if (existingOpt) {
            existingOpt.otp = otp;
            await existingOpt.save();       
        } else {
            const otpPayload = { email, otp };
            await OtpModel.create(otpPayload);   
        }
        
        return res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            otp,
        });
    } catch (e) {
        console.error((e as Error).message);
        return res.status(500).json({ success: false, error: (e as Error).message });
    }
}
}
