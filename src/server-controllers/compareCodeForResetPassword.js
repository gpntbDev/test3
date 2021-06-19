
module.exports = async (req, res, next) => {

    try {
        let usersDb = req.app.locals.collection;
        let user = await usersDb.findOne({
            email: req.body.user
        });
        if (!user) {
            return res.status(404).send({
                message: "User Not found."
            });
        } else {

            if (user.codeForResetPassword == req.body.code) {
                 res.status(200).send({
                    message: "code is correct",
                });
            } else {
                 res.status(403).send({
                    message: "code is not correct"
                });
            }
        }

    } catch (err) {

        console.log(e);
        res.status(500).send({
            error: e.name
        });


    }



}