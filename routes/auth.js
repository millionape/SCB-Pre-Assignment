const router = require('express').Router(),
      authenticationController = require('../controllers/authController');

/** /auth router */
router.post('/login', authenticationController.signin);
router.get('/logout', authenticationController.signout);

module.exports = router