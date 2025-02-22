import { domain } from "../commondata";
import { sociallinks } from "../commondata";
import { mobile } from "../commondata";

function Forgotpassmail(token) {
  return `
 <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style>
      body {
        font-family: "Helvetica Neue", Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .email-container {
        background-color: #ffffff;
        width: 100%;
        max-width: 600px;
        margin: 20px auto;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      .banner img {
        width: 100%;
        height: auto;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
      .content {
        padding: 20px;
        text-align: center;
      }
      .content h2 {
        color: #333;
        margin-bottom: 10px;
      }
      .content p {
        color: #555;
        line-height: 1.6;
        margin-bottom: 15px;
      }
      .reset-button {
        display: inline-block;
        padding: 12px 30px;
        font-size: 16px;
        color: #fff;
        border-radius: 50px;
        text-decoration: none;
        font-weight: bold;
        transition: background 0.3s ease;
      }
      .reset-button:hover {
        background-color: #0056b3;
      }
      .social-links {
        text-align: center;
        margin: 20px 0;
      }
      .social-links p {
        font-size: 14px;
        color: #777;
        margin-bottom: 10px;
      }
      .social-links a {
        display: inline-block;
        margin: 0 8px;
        text-decoration: none;
      }
      .social-links img {
        width: 24px;
        height: 24px;
      }
      .footer {
        text-align: center;
        padding: 15px;
        font-size: 14px;
        color: #777;
        border-top: 1px solid #ddd;
      }
      .footer a {
        color: #007bff;
        text-decoration: none;
        font-weight: bold;
      }
      .footer a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="banner">
        <img src="${domain}/banners/banner1-mod.jpg" alt="Banner Image" />
      </div>
      <div class="content">
        <h2>Password Reset Request</h2>
        <p>We received a request to reset your password. Click the button below to set a new password:</p>
        <a href="${domain}/forgotpassword?token=${token}" class="reset-button">Reset Password</a>
        <p>If you didn&apos;t request this, you can safely ignore this email.</p>
        <p>This password reset link will expire in 1 hour.</p>
      </div>
      <div class="social-links">
        <p>Follow us on social media:</p>
        <a href="${sociallinks?.insta}" target="_blank" rel="noopener noreferrer">
          <img src="https://img.icons8.com/fluency/48/000000/instagram-new.png" alt="Instagram" />
        </a>
        <a href="${sociallinks?.facebook}" target="_blank" rel="noopener noreferrer">
          <img src="https://img.icons8.com/fluency/48/000000/facebook.png" alt="Facebook" />
        </a>
        <a href="${sociallinks?.twitter}" target="_blank" rel="noopener noreferrer">
          <img src="https://img.icons8.com/fluency/48/000000/twitter.png" alt="Twitter" />
        </a>
        <a href="${sociallinks?.pinterest}" target="_blank" rel="noopener noreferrer">
          <img src="https://img.icons8.com/fluency/48/000000/pinterest.png" alt="Pinterest" />
        </a>
      </div>
      <div class="footer">
        <p>
          Warm regards,<br />
          <strong>Rentbean.in</strong><br />
          <a href="https://rentbean.in">Visit site</a><br />
          Contact us at <a href="mailto:Rentbeandotin@gmail.com">Rentbeandotin@gmail.com</a> or ${mobile}.
        </p>
      </div>
    </div>
  </body>
</html>
`;
}

export default Forgotpassmail;
