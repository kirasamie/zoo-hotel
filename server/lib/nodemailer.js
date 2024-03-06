const nodemailer = require('nodemailer');

const { EMAIL_NAME, EMAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport(
  {
    host: 'smtp.mail.ru',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      // Пожалуйста, используйте свой собственный аккаунт для рассылки
      user: EMAIL_NAME,
      pass: EMAIL_PASSWORD,
    },
  },
  {
    from: 'Ваш, ZooHotel <ZooHotel056@mail.ru>',
  }
);

const mailer = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.log(err);
    // console.log('Email sent: ', info);
  });
};

module.exports = mailer;
