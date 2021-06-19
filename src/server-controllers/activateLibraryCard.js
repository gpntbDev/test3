const {
    ldapCreateUser
} = require("../middlewares/ldapjs/ldap");
const currentDate = require("../utils/DateOfRegServer");
const {
    confirmEmail
} = require('../middlewares/nodemailer/nodemailer');
const crypto = require('crypto');

module.exports = async (req, res, next) => {

    const {
        email,
        password,
        phonenumber
    } = req.body;
       
    try {
        let usersDb = req.app.locals.collection;

        let irbisUsers = req.app.locals.usersFromIrbis;

        let userIrbis = await irbisUsers.findOne(libraryCardNumber);
        userIrbis.email = email;
        userIrbis.phonenumber = phonenumber;
        userIrbis.password = password;
        userIrbis.dateOfReg = currentDate();
        userIrbis.active = false;
        userIrbis.regType = "Library-card";
        userIrbis.confirmationCode = crypto.randomBytes(64).toString('hex');

        await usersDb.insertOne(userIrbis);

        await ldapCreateUser(userIrbis);
        await confirmEmail(email, confirmationCode);
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
        res.status(500).send(e.name);
    }
};