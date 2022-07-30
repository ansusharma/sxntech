import User from "../models/user.js";
import {send_otp} from  "../methods/send_otp.js";
import {hashPassword} from "../auth/auth.js";

export const registerUser = async(req, res) => {
    try {
        const { email, name } = req.body;
        if (!name || !email ) {
            res.status(400).json({ success:false, message: "Both name and email field required" });
            return;
        }
        var thisuser = await User.findOne({ email: email });
        if (!thisuser) {
            const user = new User({
                email,
                name,
            });
            thisuser = await user.save();
        }
        const unhashedotp= (Math.floor(1000 + Math.random() * 9000)).toString();
        hashPassword(unhashedotp)
            .then(async (hash)=>{
                thisuser.otp = hash;
                var minutesToAdd = 10;
                const currentDate = new Date();
                thisuser.otpExpiry = new Date(currentDate.getTime() + minutesToAdd*60000);
                thisuser.save();
                send_otp(thisuser.name,thisuser.email,unhashedotp).then(async (otpres)=>{
                    if(!otpres.error){
                        res.status(200).json({ success:true, message: "user is registered, kindly login with otp now" });
                        return;
                    }
                    else{
                        res.status(500).json({ success:false, message: "Cannot send otp" });
                        return;
                    }
                });
            })
            .catch((error) => {
                res.status(500).json({ success:false, message: error.message });
                return;
            });
    }
    catch (error) {
        res.status(500).json({ success:false, message: error.message });
        return;
    }
};
