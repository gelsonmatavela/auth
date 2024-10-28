import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplate.js";
import {mailtrapClient, sender} from './mailtrap.config.js';

export const  senderVerificationEmail = async (email, verificationToken)=>{
    const recipient = [{email}];
    try {
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:'Verify your email',
            html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category: "Email Verification"
        })
        console.log("Email send successfully", response);
    } catch (error) {
        console.error("Error sending verification email", error);
        throw new Error(`Error sending verification email: ${error}`);
    }
}

export const sendWelcomeEmail = async (email, name)=>{
    const recipient = [{email}];

    try {
        
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            template_uuid:  "1f3f35de-da85-4c91-974c-b7453534eae2",
            template_variables:{
                "company_info_name":"Simplicity For Student",
                 name: name,
            }
        });
        console.log("Welcome email sent sucessfully", response);
        
    } catch (error) {
        console.log("Error sending welcome email", error);
        throw new Error(`Error sending welcome email: ${error}`);
    }
}

export const sendResetPasswordEmail = async (email, resetURL)=>{
    const recipient = [{email}];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset",
        });
        console.log("Reset Password email sent successfully", response);
    } catch (error) {
        console.log(`Error sending reset password email`, error);
        throw new Error(`Error sending reset email password: ${error}`);
    }
}

export const sendResetSuccessEmail = async (email)=>{
    const recipient =[{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successfully",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category:"Password Reset",
        });

        console.log("Password reset email sent successfully", response);
    } catch (error) {
        console.error(`Error sending password reset success email`,error);
        throw new Error(`Error sending password reset success email:${error}`);
    }
}