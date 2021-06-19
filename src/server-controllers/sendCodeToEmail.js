const {
    sendCodeForChangePassword
} = require('../middlewares/nodemailer/nodemailer');


module.exports = async (req, res, next) => {

    try {
        let code = Math.floor(1000 + Math.random() * 9000);
        let usersDb = req.app.locals.collection;
        let user = await usersDb.findOne({
            email: req.body.user
        });
        if (!user) {
            return res.status(404).send({
                message: "User Not found."
            });
        } else {

            await usersDb.updateOne({
                email: req.body.user
            }, {
                $set: {
                    codeForResetPassword: String(code)
                }
            });
          await sendCodeForChangePassword(req.body.user, code);

            res.status(200).send({
                change: "code has been sent",
            });

        }

    } catch (err) {

        console.log(e);
        res.status(500).send({
            error: e.name
        });


    }



}