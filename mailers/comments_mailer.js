const { readyState } = require('../config/mongoose');
const nodeMailer = require('../config/nodemailer');
exports.newComment = (comment) => {
    // console.log('inside new comment mailer');
    let htmlString = nodeMailer.renderTemplate({ comment: comment }, '/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from: "Codeial",
        to: comment.user.email,
        subject: "New commment",
        html: htmlString
    }, (err, info) => {
        if (err) { console.log(err); return; }
        // console.log('message sent', info);
        return;
    });
}