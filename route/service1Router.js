const express = require('express');
const service1Service = require('../lib/service/service1Service');
const router = express.Router();

router.get('/', (req, res) => {  
    console.log('/service1');
    service1Service.home(req, res);

});


module.exports = router;