const router = require('express').Router(),
      authenticationController = require('../controllers/authController');
      userDataValidator = require("../validator/user");

router.post('/signup',userDataValidator.userDataValidate, authenticationController.signup);
router.post('/login', authenticationController.signin);
router.get('/logout', authenticationController.signout);

module.exports = router