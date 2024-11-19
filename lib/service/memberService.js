const { query } = require("express");
const DB = require("../db/db.js");
const bcrypt = require('bcrypt');

const memberService = {

    createAccountConfirm: (req, res) => {
        let post = req.body;

        let sql = `
            INSERT INTO 
                TBL_MEMBER(M_ID, M_PW, M_MAIL, M_PHONE, M_PROFILE_THUM)
            VALUES(?, ?, ?, ?, ?)
        `;
        let state = [post.m_id, bcrypt.hashSync(post.m_pw, 10), post.m_mail, post.m_phone, req.file.filename];

        DB.query(
            sql, 
            state, 
            (error, result) => {
                if (error) {
                    res.render('member/create_account_ng', {loginedMemberID: req.session.loginedMemberID});
                    
                } else {
                    res.render('member/create_account_ok', {loginedMemberID: req.session.loginedMemberID});

                }

            }

        );

    },

    memberLoginConfirm: (req, res) => {
        let post = req.body;

        let sql = `
            SELECT * FROM TBL_MEMBER WHERE M_ID=?
        `;
        let state = [post.m_id];

        DB.query(
            sql, 
            state, 
            (error, members) => {
                if (error) {
                    res.render('member/signin_ng');

                } else {
                    if (members.length > 0) {
                        if (bcrypt.compareSync(post.m_pw, members[0].M_PW)) {
                            req.session.loginedMemberID = members[0].M_ID;
                            req.session.loginedMemberROLE = members[0].M_ROLE
                            res.render('member/member_login_ok', {loginedMemberID: req.session.loginedMemberID});

                        } else {
                            res.render('member/member_login_ng', {loginedMemberID: req.session.loginedMemberID});
                        }

                    } else {
                        res.render('member/member_login_ng', {loginedMemberID: req.session.loginedMemberID});

                    }

                }

            }
        );

    },

    memberModifyForm: (req, res) => {
        if (req.session.loginedMemberID === undefined) {
            res.redirect('/member/member_login_form');

        } else {
            let sql = `
                SELECT * FROM TBL_MEMBER WHERE M_ID=?
            `;
            let state = [req.session.loginedMemberID];

            DB.query(
                sql,  
                state, 
                (error, members) => {
                    if (error) {
                        res.redirect('/');

                    } else {
                        res.render('member/member_modify_form', {
                            loginedMemberID: req.session.loginedMemberID, 
                            loginedMember: members[0]
                        });

                    }

                }

            );

        }

    },

    memberModifyConfirm: (req, res) => {
        let post = req.body;

        let sql = `
            UPDATE
                TBL_MEMBER 
            SET
                M_PW = ?,
                M_MAIL = ?,
                M_PHONE = ?, 
                ${req.file !== undefined ? `M_PROFILE_THUM = ?, ` : ``}
                M_MOD_DATE = NOW() 
            WHERE 
                M_NO = ?
        `;
        let state = [bcrypt.hashSync(post.m_pw, 10), post.m_mail, post.m_phone];
        if (req.file !== undefined) {
            state.push(req.file.filename);
        }
        state.push(post.m_no);

        DB.query(
            sql, 
            state, 
            (error, result) => {
                if (error) {
                    res.render('member/member_modify_ng', {loginedMemberID: req.session.loginedMemberID});

                } else {
                    res.render('member/member_modify_ok', {loginedMemberID: req.session.loginedMemberID});

                }

            }

        );

    },

    memberDeleteConfirm: (req, res) => {
        if (req.session.loginedMemberID === undefined) {
            res.redirect('/member/member_login_form');

        } else {
            let sql = `DELETE FROM TBL_MEMBER WHERE M_ID = ?`;
            let state = [req.session.loginedMemberID];
            DB.query(
                sql, 
                state, 
                (error, result) => {
                    if (error) {
                        res.render('member/member_delete_ng', {loginedMemberID: req.session.loginedMemberID});

                    } else {
                        req.session.destroy(() => {
                            res.redirect('/member/member_logout_confirm');
        
                        });

                    }

                }
                
            )

        }

    }
    
}

module.exports = memberService;