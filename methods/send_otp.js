import nodemailer from "nodemailer";
export const send_otp = async(name, email, otp) => {
    try { 
      // console.log(otp);

      
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD
        }
      });
        
      var mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: 'OTP for login in funegle',
          html: '<h2>Hi '+name+'</h2><p>Your otp for login is '+otp+'!</p>'
      };        
      return transporter.sendMail(mailOptions); 
   
      // return {error:false};
    } catch (error) {
        return false;
    }
};