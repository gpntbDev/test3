const mainRouter = require('express').Router();


mainRouter.use('/', require('./user'));



module.exports = mainRouter;