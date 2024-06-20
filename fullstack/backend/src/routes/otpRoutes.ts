import { OtpController } from "../controllers/otpController";
import express from "express";

const router = express.Router();
const otpController = new OtpController();

// Route POST envoi un OTP 
router.post('/send-otp', otpController.otp.bind(otpController));

export { router as otpRouter };