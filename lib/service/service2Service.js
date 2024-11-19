const service2Service = {
    
    home: (req, res) => {
        if (req.session.loginedMemberID === undefined) {
            res.redirect('/member/member_login_form');

        } else if (req.session.loginedMemberROLE !== 'USER') {
            res.render('member/access_denied', {loginedMemberID: req.session.loginedMemberID});

        } else {
            res.render('service2/home', {loginedMemberID: req.session.loginedMemberID});
            
        }

    }

}

module.exports = service2Service;