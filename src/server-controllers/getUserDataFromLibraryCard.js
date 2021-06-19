module.exports = async (req, res, next) => {


    try {

        let usersDb = req.app.locals.collection;
        let user = await usersDb.findOne(req.body);
        if (!user) {
            let irbisUsers = req.app.locals.usersFromIrbis;
            let userIrbis = await irbisUsers.findOne(req.body);
            if (!userIrbis) {
                return res.status(404).send({
                    message: "User Not found."
                });
            }
            let userData = {};
            if (userIrbis.email) {
                userData.email = userIrbis.email;
            }
            if (userIrbis.phonenumber) {
                userData.phonenumber = userIrbis.phonenumber;
            }
            return res.status(200).send(userData);

        } else {
            return res.status(400).send({
                message: "User is already registred."
            });
        }


    } catch (err) {

        console.log("error", err);
        return res.status(500).send({
            message: "Server Error."
        });

    }

}