import mongoose from "mongoose";
import mailSender from "../utils/mailSender";

export interface IOtp extends mongoose.Document {
    email: string;
    otp: string;
    createdAt: Date;
}

const otpSchema: mongoose.Schema<IOtp> = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5,
    },
});

async  function sendVerificationEmail(email: string, otp: string) {
    try {
        const mailResponse = await mailSender(
            email,
            "Verification Email",
            `<h1>Please confirm your OTP</h1>
            <p>Here is your OTP code: ${otp}</p>`
        );
        console.log("Email sent successfully: ", mailResponse);
    } catch (e) {
        console.log("Error occured while sending email: ", e);
        throw e;
    }
}
otpSchema.pre("save", async function (next) {
    console.log("New document saved to the database");
    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
});

export const OtpModel = mongoose.model<IOtp>("Otp", otpSchema);
