// const nodemailer = require("nodemailer");

// const nodemailerSend = async (to) => {
//   const transporter = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: process.env.MAIL_TRAP_USER,
//       pass: process.env.MAIL_TRAP_PASS,
//     },
//   });

//   // send mail with defined transport object
//   const message = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>',
//     to,
//     subject: "Hello ✔",
//     text: "Hello world?",
//     html: "<b>Hello world?</b>",
//   });

//   console.log("Message sent: %s", message.messageId);
// };

// module.exports = nodemailerSend;
