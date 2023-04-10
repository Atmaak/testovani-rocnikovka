const nodemailer = require("nodemailer");
const sendIt = (data) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.seznam.cz",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "rocnikovka69@seznam.cz", // generated ethereal user
          pass: "nejakapepega123", // generated ethereal password
        },
      });
    transporter.sendMail({
        from: 'rocnikovka69@seznam.cz', // sender address
        to: `${data.email.to}`, // list of receivers
        subject: `${data.email.subject}`, // Subject line
        text: `${data.email.text}`, // plain text body
        html: `${data.email.html}`
    });
}


module.exports = { 
    sendIt
}