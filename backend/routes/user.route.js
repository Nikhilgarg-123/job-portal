const express = require('express');
const {registerUser, loginUser, logout, updateprofile} = require('../controllers/user.controller');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logout);
router.route('/updateprofile').post(updateprofile);
