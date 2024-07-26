import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import emailHtml from "./emailHtml.js";

const sendEmails = async (email) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail", // Use Gmail's SMTP server
            auth: {
                user: "abdelrhmanali1812@gmail.com",
                pass: "cjbnzzntqprzdxpy", // Ensure this is an application-specific password
            },
        });

        // Generate JWT token
        jwt.sign({ email }, "ody", async (err, token) => {

            const info = await transporter.sendMail({

                from: '" Job Search App " Abdelrhman " 💛" <abdelrhmanali1812@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "Hello ✔", // Subject line
                html: emailHtml(token), // html body

            });

            console.log("Message sent: %s", info.messageId);

        });
    } catch (error) {
        console.error("Error initializing email sending:", error);
        res.status(500).json({ message: "Email sending initialization failed", error });
    }
};

export default sendEmails;
