const express = require('express');
const router = express.Router();
const UserContact = require('../models/UserContact');
const nodemailer = require("nodemailer");
require("dotenv").config();
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user:process.env.EMAIL,
        pass:process.env.PASSWORD,
    },
});
async function main(email) {
    const info = await transporter.sendMail({
        from:process.env.EMAIL,
        to: email,
        subject: "Thank You for Reaching Out to Us!",
        text: `Dear Customer, 

        Thank you for contacting us! We have received your message and truly appreciate you reaching out. 

        Our team is reviewing your inquiry, and we will get back to you as soon as possible. In the meantime, if you have any additional details to share, feel free to reply to this email.

        We value your time and look forward to assisting you!
        Best regards,  
        Real Estate Company  
        contact@realestate.com  
        www.realestate.com`,
        html: `<p>Dear Customer,</p>

        <p>Thank you for reaching out to us! We have received your message and truly appreciate your interest.</p>

        <p>Our team is currently reviewing your inquiry, and we will get back to you as soon as possible. If you have any additional details to share, feel free to reply to this email.</p>

        <p>We value your time and look forward to assisting you!</p>

        <p>Best regards,</p>
        <p><strong>Real Estate Company</strong><br>
        contact@realestate.com <br>
        <a href="www.realestate.com">Visit our website</a></p>`
            });
    console.log("Message sent: %s", info.messageId);
}
router.post("/", async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        
        const { firstName, lastName, email, subject, message } = req.body;
        console.log("Extracted firstName:", firstName);

        if (!firstName || !lastName || !email || !subject || !message) {
            return res.status(400).json({ msg: "All fields are required" });
        }
        let emailExist=await UserContact.findOne({email:email});
        if(emailExist){
            return res.status(400).json({msg:"Email already exists"});
        }
        else{
            const userContact = new UserContact({  // ✅ Save in camelCase
                firstName,
                lastName,
                email,
                subject,
                message
            });
            await userContact.save();
            // Send email
            await main(email);
            return res.status(200).json({ msg: "Contact saved successfully" });

        }
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

module.exports = router;
