import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import { compareOtp } from "../auth/auth.js";

// Handle user login
export const loginUser = async (req, res) => {
    const userInfo = req.body;
    try {
        console.log("*");
        const user = await User.findOne({ email: userInfo.email });
        console.log("**");
        if (!user) {
            res.status(404).json({
                success:false,
                message: "An account with this email does not exist.",
            });
            return;
        }
        const { email,password } = req.body;
        if (!password || !email ) {
            res.status(400).json({ success:false, message: "Both email and passord field required" });
            return;
        }
        
        compareOtp(password, user.hashed_password)
        .then((response) => {
            if (response) {

                res.status(200).json({
                    success:true,
                    message:"login sucessfull"
                });
                return;
            } else {
                res.status(200).json({
                    success:false,
                    message: "Invalid login details"
                });
                return;
            }
        })

       

        
        
    } catch (error) {
        res.status(500).json({ success:false, message: error.message });
        return;
    }
};