const express = require('express');
const {registerUser, loginUser, logout, updateprofile} = require('../controllers/user.controller');
const isauthenticated = require('../middleware/jsauth');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logout);
router.route('/updateprofile').patch(isauthenticated ,updateprofile);


module.exports = router;