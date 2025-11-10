const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post('/signup', (req, res) => {
  console.log('📩 POST /signup hit');
  userController.registerUser(req, res);
});


router.post('/login', authController.loginUser);




module.exports = router;
