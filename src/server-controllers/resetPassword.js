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

            let result = await usersDb.updateOne({
                email: req.body.user
            }, {
                $set: {
                    password: req.body.password
                },
            });
            res.status(200).send({
                change: "password has been changed",
            });
        }

    } catch (err) {

        console.log(err);
        res.status(500).send({
            error: err.name
        });


    }



}