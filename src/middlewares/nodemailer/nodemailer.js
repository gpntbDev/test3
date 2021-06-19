const nodemailer = require("nodemailer");
const messageAfterRegistration = require("./messageAfterRegistration");
const messageRestorePassword = require("./messageRestorePassword");

const {
  EMAIL_HOST,
  EMAIL_PORT
} = process.env;


module.exports.confirmEmail = async (address, code) => {
  try {
    let transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure:false,
   });


    await transporter.sendMail({
      from: '"No-reply-GPNTBSIB" <disp@spsl.nsc.ru>',
      to: `${address}`,
      subject: "Подтвердите свою электронную почту, для активации профиля на сайте ГПНТБ СО РАН",
      text: "access code",
      html: messageAfterRegistration(code),
    });
  } catch (err) {
    console.log('Error occurred');
    console.log(err);
  }

}


module.exports.sendCodeForChangePassword = async (address, code) => {
  try {
    let transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure:false,
  });


    await transporter.sendMail({
      from: '"No-reply-GPNTBSIB" <disp@spsl.nsc.ru>',
      to: `${address}`,
      subject: "Восстановление пароля в личный кабинет сайте ГПНТБ СО РАН",
      text: "access code",
      html: messageRestorePassword(code),
    });
  } catch (err) {
    console.log('Error occurred');
    console.log(err.message);
  }

}