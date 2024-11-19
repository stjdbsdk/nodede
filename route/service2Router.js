const express = require('express');
const service2Service = require('../lib/service/service2Service');
const router = express.Router();

router.get('/', (req, res) => {  
    console.log('/service2');
    service2Service.home(req, res);

});


module.exports = router;