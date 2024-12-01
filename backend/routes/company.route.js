const express = require('express');
const {companyregister , getcompany , getcompanybyid , updatecompany} = require('../controllers/company.controller');
const isauthenticated = require('../middleware/jsauth');

const router = express.Router();

router.route('/registercompany').post(isauthenticated,companyregister);

router.route('/getcompanies').get(isauthenticated,getcompany);

router.route('/getcompany/:id').get(isauthenticated,getcompanybyid);    

router.route('/updatecompany/:id').patch(isauthenticated ,updatecompany);



module.exports = router;