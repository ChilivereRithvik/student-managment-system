const express=require('express');
const router = express.Router();
const {postApplication,getallApplications} = require('../Controller/applicationController.js');
const { isAdminAuthonticated,isUserAuthonticated } = require('../Middlewares/auth.js');


router.post('/postApplication',isUserAuthonticated,postApplication);

router.get('/admin/getallapplications',isAdminAuthonticated,getallApplications);






module.exports = router;