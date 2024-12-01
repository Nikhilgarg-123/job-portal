const express = require('express');
const {postjob} = require('../controllers/job.controller');
const isauthenticated = require('../middleware/jsauth');

const router = express.Router();

router.route('/postjob').post(isauthenticated,postjob);


module.exports = router;