import nodemailer from 'nodemailer';
import config from '../config';
const sendEmail = async (url: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.node_env === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'mashuq0068@gmail.com',
      pass: 'ffbw dnzw vnbc oupu',
    },
  });
  await transporter.sendMail({
    from: '"Ph-university" <mashuq0068@gmail.com>', // sender address
    to: 'f1118166@gmail.com', // list of receivers
    subject: 'Forget Password validation', // Subject line
    text: 'Forgot your password?', // plain text body
    html: `<p>No:2: ${url}</p> <img src="https://cdni.iconscout.com/illustration/premium/thumb/forget-password-5379696-4503308.png"/>`, // html body
  });
};

export default sendEmail;
