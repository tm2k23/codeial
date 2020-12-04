const { readyState } = require('../config/mongoose');
const nodeMailer = require('../config/nodemailer');
exports.newComment = (comment) => {
    // console.log('inside new comment mailer');
    nodeMailer.transporter.sendMail({
        from: "Codeial",
        to: comment.user.email,
        subject: "New commment",
        html: "<h1>New comment published</h1>"
    }, (err, info) => {
        if (err) { console.log(err); return; }
        // console.log('message sent', info);
        return;
    });
}