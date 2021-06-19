module.exports = async (req, res, next) => {


    try {
        let usersDb = req.app.locals.collection;
        let users = await usersDb.find().toArray();
        console.log(users);
        if (!users) {
            return res.status(404).send({
                message: "Users Not found."
            });
        }

        return res.status(200).send({users});

    } catch (err) {

        console.log("error", err);
        return res.status(500).send({
            message: "Server Error."
        });

    }

}