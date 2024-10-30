import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendFollowNotification = async ({ email, user, followUser }) => {
  
  const mailOptions = {
    to: email,
    subject: "You have a new follower",
    html: `
        <!DOCTYPE html>
<html>
<head>
  <title>Welcome to Our Social Network!</title>
  <style>
    /* Basic styling */
    body {
      font-family: Arial, sans-serif;
      font-size: 16px;
      line-height: 1.5;
      color: #333;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f2f2f2;
    }

    h1 {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
    }

    p {
      margin-bottom: 10px;
    }

    a {
      color: #007bff;
      text-decoration: none;
    }

    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Your Post has a new comment </h1>
    <p>Hi ${followUser},</p>
    <p>${user} started following you❤️</p>
    <p>Best regards,</p>
    <p>The Threads Clone Team</p>
  </div>
</body>
</html>
      `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error Sending Mail: ", error.message);
    } else {
      console.log("Email Sent: ", info.response);
    }
  });
};

const sendCommentNotification = async ({ email, name, user }) => {
  const mailOptions = {
    to: email,
    subject: "Your Post Has A New Comment!",
    html: `
        <!DOCTYPE html>
<html>
<head>
  <title>Welcome to Our Social Network!</title>
  <style>
    /* Basic styling */
    body {
      font-family: Arial, sans-serif;
      font-size: 16px;
      line-height: 1.5;
      color: #333;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f2f2f2;
    }

    h1 {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
    }

    p {
      margin-bottom: 10px;
    }

    a {
      color: #007bff;
      text-decoration: none;
    }

    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Your Post has a new comment </h1>
    <p>Hi ${name},</p>
    <p>${user} commented on your post❤️</p>
    <p>Best regards,</p>
    <p>The Threads Clone Team</p>
  </div>
</body>
</html>
      `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error Sending Mail: ", error.message);
    } else {
      console.log("Email Sent: ", info.response);
    }
  });
};

export { sendFollowNotification, sendCommentNotification };
