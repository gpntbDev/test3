module.exports = async (req, res, next) => {


    try {
        let usersDb = req.app.locals.collection;
        let user = await usersDb.findOne({
            confirmationCode: req.params.code
        });
        if (!user) {
            return res.status(404).send({
                message: "User Not found."
            });
        }
        await usersDb.updateOne({
            email: user.email
        }, {
            $set: {
                active: true
            },
        });

        return res.send(`<!DOCTYPE html>
          <html lang="ru">
          
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Successfull confirmation of email</title>
              <style>
                  main {
                      min-height: 100vh;
                      background-color: #8ab5e1;
                  }
          
                  body {
                      margin: 0;
                  }
          
                  .popup {
                      position: fixed;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 100%;
                      background-color: rgba(51, 51, 51, 0.7);
                      display: flex;
                      align-items: center;
                      justify-content: center;
                  }
          
                  .popup-content {
                      font-family: Blogger Sans;
                      width: 652px;
                      display: flex;
                      flex-direction: column;
                      justify-content: flex-start;
                      align-items: center;
                      min-height: 655px;
                      background-color: #fff;
                      border-radius: 30px;
                  }
          
                  .popup-content_justify-center {
                      justify-content: center;
                      min-height: initial;
                      padding: 100px 0;
                  }
          
                  .successfull-registration-title {
                      font-family: Blogger Sans, Arial, Helvetica, sans-serif;
                      font-weight: bold;
                      font-size: 24px;
                  }
          
                  .successfull-registration-text {
                      font-family: Blogger Sans, Arial, Helvetica, sans-serif;
                      font-size: 20px;
                  }
          
                  @media screen and (max-width:720px) {
                      .popup-content {
                          width: calc(100% - 32px);
                          margin: 0 16px;
                          min-height: 438px;
                          padding: 10px;
                      }
                  }
              </style>
          </head>
          
          <body>
              <main>
                  <div class="popup">
                      <div class="popup-content popup-content_justify-center">
                          <p class="successfull-registration-title">Почта успешно подтверждена</p>
                          <p class="successfull-registration-text">
                              Через 3 секунды Вы будете перенаправлены в личный кабинет
                          </p>
          
                      </div>
                  </div>
              </main>
              <script>
                  window .onload = () => {
                      setTimeout(() => {
                          window.location.replace("http://auth.gpntbsib.ru:3000/");
                      }, 2200);
          
                  };
              </script>
          </body>
          
          </html>`);

    } catch (err) {

        console.log("error", err);

    }

}