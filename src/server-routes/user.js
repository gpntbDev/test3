const passport = require('passport');
const router = require('express').Router();
const passportCustomCallback = require('../middlewares/passport/callbacks');
const signupController = require('../server-controllers/signup');
const confirmEmailController = require('../server-controllers/confirmEmail');
const updateInfoController = require('../server-controllers/update');
const getUserDataController = require('../server-controllers/getuserdatafromlibrarycard');
const saveIamge = require('../server-controllers/saveImage');
const activatelibrarycard = require('../server-controllers/activateLibraryCard');


router.post('/saveimage', saveIamge);

router.post('/activatelibrarycard', activatelibrarycard);


//route for adding users from irbis to mongodb
router.get('/fdsdef2332trew/nbv54', require('../server-controllers/irbis').addDataToMongo);



//route for registration of user
router.post('/signup', signupController);
router.post('/checkemail', require("../server-controllers/checkEmail"));

router.post('/getuserdatafromlibrarycard', getUserDataController);

router.get('/getallusers', passport.authenticate('jwt-admin', {
  session: false
}), require("../server-controllers/getAllUsers"));



router.get('/confirm-email/:code', confirmEmailController);

//passport authentification

router.post('/login-email', passportCustomCallback('local'));
router.post('/login-library-card', passportCustomCallback('local-library-card'));

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passportCustomCallback('facebook'));


router.get('/auth/vkontakte', passport.authenticate('vkontakte', {
  scope: ['email']
}));
router.get('/auth/vkontakte/callback', passportCustomCallback('vkontakte'));


router.get('/auth/orcid', passport.authenticate('orcid'));
router.get('/auth/orcid/callback', passportCustomCallback('orcid'));



router.post('/signin', passportCustomCallback('local'));


router.get('/verifytoken', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  console.log(req.user);
  res.send(req.user);
});


router.get('/users/me', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  res.send({
    data: req.user
  });
  console.log(req.user);
});




router.get('/signout', passport.authenticate('jwt', {
  session: false
}), (req, res, next) => {
  res.cookie('jwt', '', {
    path: '/',
    signed: false,
    maxAge: -1,
    expires: new Date(0)
  });
  res.status(200).send({
    data: 'deleted'
  });
});



router.get('/images/users/:path', require("../middlewares/passport/customCallbackJWT"));


router.get('/images/logogpntb/:userid', require("../middlewares/passport/customCallbackJWT"));


router.post('/updateinfo', updateInfoController);


router.post('/send-code-for-reset-password', require("../server-controllers/sendCodeToEmail"));

router.post('/verify-codes-for-reset-password', require("../server-controllers/compareCodeForResetPassword"));

router.post('/reset-user-password', require("../server-controllers/resetPassword"));




module.exports = router;