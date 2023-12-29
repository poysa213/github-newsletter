import nodemailer from "nodemailer";

export async function sendMail(subject:string, toEmail:string, htmlContent:string) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: toEmail,
    subject: subject,
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, function (error:any, info:any) {
    if (error) {
      throw new Error(error);
    } else {
      console.log("Email Sent");
      return true;
    }
  });
}