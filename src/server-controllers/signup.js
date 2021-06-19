const ldap = require("ldapjs");
const currentDate = require("../utils/DateOfRegServer");
const {
  ldapCreateUser
} = require("../middlewares/ldapjs/ldap");
const {appendData} = require('../server-controllers/irbis');
const dateOfReg = require("../utils/DateOfReg");
const {
  confirmEmail
} = require('../middlewares/nodemailer/nodemailer');
const crypto = require('crypto');

module.exports = async (req, res, next) => {

 
  const userData = {
    active: false,
    regType:"standard",
    dateOfReg: currentDate(),
    libraryCardNumber: String(Math.round(Math.random() * (100000))),
    ...req.body,
    confirmationCode: crypto.randomBytes(64).toString('hex')
  };

  try {
    let usersDb = req.app.locals.collection;

    let user = await usersDb.findOne({
      email: userData.email
    });

    if (user) {
      res.status(409).send({
        message: 'Пользователь с таким логином уже зарегистрирован'
      });
    } else {

      await usersDb.insertOne(userData);
      await appendData(userData, "signup");
      await ldapCreateUser(userData);
      await confirmEmail(req.body.email, userData.confirmationCode);
      res.status(200).send({
        data: "reg completed"
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e.name);
  }
};