import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { compareOtp } from "../auth/auth.js";

// Handle user login
export const loginUser = async (req, res) => {
    const userInfo = req.body;

    try {
        const user = await User.findOne({ email: userInfo.email });
        if (!user) {
            res.status(404).json({
                success:false,
                message: "An account with this email does not exist.",
            });
            return;
        }
        const { otp, email } = req.body;
        if (!otp || !email ) {
            res.status(400).json({ success:false, message: "Both email and otp field required" });
            return;
        }

        var thisTime = new Date();
        if(!user.otpExpiry || user.otpExpiry < thisTime){
            res.status(200).json({ success:false, message: "Sorry, OTP has been expired. Try again." });
            return;
        }

        // Check if otp is correct
        compareOtp(userInfo.otp, user.otp)
            .then((response) => {
                if (response) {
                    const token = jwt.sign(
                        { id: user._id },
                        process.env.JWT_SECRET_KEY
                    );

                    res.status(200).json({
                        success:true,
                        token,
                        user: {
                            id: user._id,
                            email: user.email,
                            name: user.name,
                        },
                    });
                    return;
                } else {
                    res.status(200).json({
                        success:false,
                        message: "OTP is invalid"
                    });
                    return;
                }
            })
            .catch((error) => {
                res.status(500).json({
                    success:false,
                    message: error.message,
                });
                return;
            });
        
    } catch (error) {
        res.status(500).json({ success:false, message: error.message });
        return;
    }
};
