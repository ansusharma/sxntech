import userSchema from "../models/userSchema.js";
// import { send_otp } from "../methods/send_otp.js";
import { hashPassword } from "../auth/auth.js";

export const signUp = async (req, res) => {
    try {
        var { email, firstname, lastname, mobileno, usertype, password } = req.body;
        if (!email || !firstname || !lastname || !mobileno || !password) {
            res.status(200).json({ success: false, message: "All fields are manadatory" });
            return;
        }

        const regex_pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!(regex_pattern.test(email))) {
            res.status(200).json({ success: false, message: "Provide a valid email address" });
            return;
        }
        if (!usertype) {
            usertype = 0;
        }
        var thisuser = await userSchema.findOne({ email: email });
        if (!thisuser) {
            hashPassword(password)
                .then(async (hashed_password) => {
                    const user = new userSchema({
                        email, 
                        firstname , 
                        lastname ,
                        mobileno ,
                        usertype,
                        hashed_password
        
                    });
                    thisuser = await user.save();
                    res.status(200).json({ success: true, message: "user registered" });
                    
                })
                .catch((error) => {
                    res.status(500).json({ success: false, message: error.message });
                    return;
                });

        }
        else {
            res.status(400).json({ success: false, message: "user already registered" });
        }

    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
        return;
    }
};
