const express = require('express');
const router = express.Router();
const {addstreamdetails, getallstreams } = require('../controllers/livestream');




router.post('/livestream',addstreamdetails);

router.get('/livestream/find', getallstreams);





module.exports = router;