const nodemailer = require("nodemailer");
const { readyState } = require("./mongoose");
const path = require("path");
const ejs = require("ejs");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'codeial.by.tejas@gmail.com', // generated ethereal user
        pass: 'codeial.by.tejas@12345', // generated ethereal password
    },
});

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile; {
        path.join(__dirname, '.../views/mailers', relativePath),
            data,
            function(err, template) {
                if (err) { console.log(err); return; }
                mailHTML = template;
            }
    }
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}