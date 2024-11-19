const express = require('express');
const memberService = require('../lib/service/memberService');
const uploads = require('../lib/upload/uploads');
const router = express.Router();

router.get('/create_account_form', (req, res) => {  
    console.log('/member/create_account_form');
    res.render('member/create_account_form', {loginedMemberID: req.session.loginedMemberID});

});

router.post('/create_account_confirm', uploads.UPLOAD_PROFILE_MIDDLEWARE(), (req, res) => {  
    console.log('/member/create_account_confirm');
    memberService.createAccountConfirm(req, res);

});


router.get('/member_login_form', (req, res) => {  
    console.log('/member/member_login_form');
    res.render('member/member_login_form', {loginedMemberID: req.session.loginedMemberID});

});

router.post('/member_login_confirm', (req, res) => {  
    console.log('/member/member_login_confirm');
    memberService.memberLoginConfirm(req, res);

});

router.get('/member_logout_confirm', (req, res) => {  
    console.log('/member/member_logout_confirm');
    req.session.destroy(() => {
        res.redirect('/');

    });

});

router.get('/member_modify_form', (req, res) => {  
    console.log('/member/member_modify_form');
    memberService.memberModifyForm(req, res);

});

router.post('/member_modify_confirm', uploads.UPDATE_PROFILE_MIDDLEWARE(), (req, res) => {  
    console.log('/member/member_modify_confirm');
    memberService.memberModifyConfirm(req, res);

});

router.get('/member_delete_confirm', (req, res) => {  
    console.log('/member/member_delete_confirm');
    memberService.memberDeleteConfirm(req, res);

});

module.exports = router;