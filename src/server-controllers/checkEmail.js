
module.exports = async (req, res, next) => {

 
  try {
    let usersDb = req.app.locals.collection;

    let user = await usersDb.findOne(req.body);

    if (user) {
      res.status(409).send({
        message: 'Пользователь с таким логином уже зарегистрирован'
      });
    } else {

      res.status(200).send({
        data: "email is unique"
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e.name);
  }
};