const ldap = require("ldapjs");
const {
  updateUserInfo
} = require("../middlewares/ldapjs/ldap");
const {
  confirmEmail
} = require('../middlewares/nodemailer/nodemailer');
const {
  appendData
} = require('../server-controllers/irbis');
const crypto = require('crypto');

const currentDate = require("../utils/DateOfRegServer");

module.exports = async (req, res, next) => {
  console.log(req.body);

  try {
    let usersDb = req.app.locals.collection;
    let toChange = {};
    toChange[req.body.change.changedField] = req.body.change.value;
    let {
      email
    } = req.body;


    let user = await usersDb.findOne({
      email
    });

    let userChange = {
      ...req.body.change
    };
    userChange.email = email;
    userChange.oldValue = user[req.body.change.changedField];
    userChange.date = currentDate();
    user.changeDate = currentDate();
    user[req.body.change.changedField] = req.body.change.value;

    if (req.body.change.changedField == "password") {
      await updateUserInfo(Number(user.libraryCardNumber), req.body.change.password);
    }

    if (req.body.change.changedField == "email") {
      let code = crypto.randomBytes(64).toString('hex');
      let result = await req.app.locals.collection.updateOne({
        email
      }, {
        $set: {
          active: false,
          ...toChange,
          confirmationCode: code,

        },
      });
      await confirmEmail(email, code);
      await req.app.locals.additionalCollection.insertOne(userChange);

    } else {
      await req.app.locals.additionalCollection.insertOne(userChange);

      let result = await req.app.locals.collection.updateOne({
        email
      }, {
        $set: {
          ...toChange
        },
      });
    }

    await appendData(user, "update");

    res.status(200).send({
      change: "update completed",
    });
  } catch (e) {
    if (e.code == 11000) {
      return res.status(409).send({
        error: "duplicate key"
      });
    }
    console.log(e);
    res.status(500).send({
      error: e.name
    });
  }
};