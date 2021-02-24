const router = require('express').Router()
const passport = require('passport')
const userController = require('../controllers/userController');
const dataValidator = require("../validator/user");
/** /users router */
router.get('/',passport.authenticate('jwt', {session: false}), userController.getUserInfo);
router.delete('/',passport.authenticate('jwt', {session: false}), userController.deleteCurrentUser);
router.post('/',dataValidator.userDataValidate,userController.signup);
router.post('/orders',passport.authenticate('jwt', {session: false}),dataValidator.ordersParamsValidate, userController.makingOrders);

module.exports = router;