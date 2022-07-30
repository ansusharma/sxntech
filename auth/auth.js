import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Hash the user password before saving to the database
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
};

// Check if password is correct
export const compareOtp = async (otp, userotp) => {
    const isMatch = await bcrypt.compare(otp, userotp);
    return isMatch;
};

// Protect private routes from unauthorized users
export const authorizedRoutes = async (req, res, next) => {
    // Check if user is authenticated
    try {
        let userToken;

        // Check if the request has the required header
        if (req.header("Authorization")) {
            userToken = req.header("Authorization").replace("Bearer ", "");
        }

        // Check if token is valid
        if (userToken) {
            const verifyToken = jwt.verify(
                userToken,
                process.env.JWT_SECRET_KEY
            );

            // Check if the token is still attached to a user
            const user = await User.findById({ _id: verifyToken.id });

            if (user) {
                req.userid = user._id;
            } 
            else {
                return res.status(404).json({
                    // User deleted account and token is still valid
                    message:"No user found",
                    success:false
                });
            }

            // Proceed to the next handler
            next();
        } else {
            res.status(401).json({
                message: "You are not authorized to access this page.",
                success:false
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message ,success:false});
    }
};


export const tokenValidity = async (req, res) => {

    if(req.userid){
        return res.status(200).json({
            success:true,
            message:"Token is Valid"
        });
    }

    return res.status(200).json({
        success:false,
        message:"Token not Valid"
    });
};