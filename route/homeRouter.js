const express = require('express');
const router = express.Router();

// /home
router.get('/', (req, res) => {  
    console.log('/home');
    res.render('home/home', {loginedMemberID: req.session.loginedMemberID});

});

module.exports = router;