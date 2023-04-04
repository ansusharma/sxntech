import userSchema from "../models/userSchema.js";
// import { send_otp } from "../methods/send_otp.js";
// import { hashPassword } from "../auth/auth.js";

export const signUp = async (req, res) => {
    try {
        var { email, firstname , lastname ,mobileno ,usertype } = req.body;
        if (!email || !firstname || !lastname || !mobileno) {
            res.status(200).json({ success: false, message: "All fields are manadatory" });
            return;
        }

        const regex_pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!(regex_pattern.test(email))) {
            res.status(200).json({ success: false, message: "Provide a valid email address" });
            return;
        }
        if(!usertype){
            usertype=0;
        }
        var thisuser = await userSchema.findOne({ email: email });
        if (!thisuser) {
            const user = new userSchema({
                email, 
                firstname , 
                lastname ,
                mobileno ,
                usertype 
            });
            thisuser = await user.save();
            res.status(200).json({ success: true, message: "user registered" });
        }
        else{
            res.status(400).json({ success: false, message: "user already registered" });
        }

        /*
        const unhashedotp = (Math.floor(1000 + Math.random() * 9000)).toString();
        hashPassword(unhashedotp)
            .then(async (hash) => {
                thisuser.otp = hash;
                var minutesToAdd = 10;
                const currentDate = new Date();
                thisuser.otpExpiry = new Date(currentDate.getTime() + minutesToAdd * 60000);
                thisuser.save();
                send_otp(thisuser.name, thisuser.email, unhashedotp).then(async (otpres) => {
                    if (!otpres.error) {
                        res.status(200).json({ success: true, message: "user is registered, kindly login with otp now" });
                        return;
                    }
                    else {
                        res.status(500).json({ success: false, message: "Cannot send otp" });
                        return;
                    }
                });
            })
            .catch((error) => {
                res.status(500).json({ success: false, message: error.message });
                return;
            });
            */
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
        return;
    }
};
