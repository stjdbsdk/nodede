const multer = require("multer");
const fs = require('fs');
const uuid4 = require("uuid4");
const path = require('path');

const uploads = {

    UPLOAD_PROFILE_MIDDLEWARE : () => {

        const upload = multer({
            storage: multer.diskStorage({
                destination(req, file, done) {
                    // Windows
                    // let fileDir = `C:\\member\\profile\\${req.body.m_id}\\`;
                    // Ubuntu
                    // let fileDir = `/member/profile/${req.body.m_id}/`;

                    let fileDir = `${process.env.MEMBER_PROFILE_PATH}${req.body.m_id}/`;

                    if (!fs.existsSync(fileDir)) {
                        fs.mkdirSync(fileDir, {recursive: true});
                    }

                    done(null, fileDir);
                },
                filename(req, file, done) {
                    let uuid = uuid4();
                    let extName = path.extname(file.originalname);
                    let fileName = uuid + extName;

                    done(null, fileName);

                }
            }),
            limits: {
                fileSize: 1024 * 1024,
            },
        });

        return upload.single('profile_file');

    },

    UPDATE_PROFILE_MIDDLEWARE : () => {

        const upload = multer({
            storage: multer.diskStorage({
                destination(req, file, done) {
                    // Windows
                    // let fileDir = `C:\\member\\profile\\${req.session.loginedMemberID}\\`;
                    // Ubuntu
                    // let fileDir = `/member/profile/${req.session.loginedMemberID}/`;

                    let fileDir = `${process.env.MEMBER_PROFILE_PATH}${req.session.loginedMemberID}/`;

                    if (!fs.existsSync(fileDir)) {
                        fs.mkdirSync(fileDir, {recursive: true});
                    }

                    done(null, fileDir);
                },
                filename(req, file, done) {
                    let uuid = uuid4();
                    let extName = path.extname(file.originalname);
                    let fileName = uuid + extName;

                    done(null, fileName);

                }
            }),
            limits: {
                fileSize: 1024 * 1024,
            },
        });

        return upload.single('profile_file');

    },

}

module.exports = uploads;