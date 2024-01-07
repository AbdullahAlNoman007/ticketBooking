import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'production',
    auth: {
      user: 'sunanrabbi1918@gmail.com',
      pass: 'lfoi mpns sxot tkun',
    },
  });

  try {
    await transporter.sendMail({
      from: 'sunanrabbi1918@gmail.com',
      to,
      subject: 'Forget Password',
      text: 'Please Reset your password within 10 minutes',
      html,
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
