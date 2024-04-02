// const cron = require('node-cron');
// const nodemailer = require('nodemailer');

// // Array of email IDs and content
// const emails =
//   {
//     email: 'sanddysuresh@gmail.com',
//     content: 'Hello, this is email content for recipient 1.',
//     minute: 43,
//     hour: 7,
//     date: 1,
//     month:4
//   }


// // Create a SMTP transporter using nodemailer (use your email provider's SMTP settings)
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   secure: false,
//   auth: {
//     user: 'sanddysuresh@gmail.com',
//     pass: 'ydbo imta ewqu ceku'
// },
// });

// // Function to send email to each recipient
// const sendEmail = (email, content) => {
//   const mailOptions = {
//     from:`"sanddysuresh@gmail.com" <${'sanddysuresh@gmail.com'}>`,
//     to: email,
//     subject: 'Scheduled Email',
//     text: content,
//   };

//   // Send email
//   transporter.sendMail(mailOptions, function(error, info) {
//     if (error) {
//       console.error('Error sending email to', email, ':', error);
//     } else {
//       console.log('Email sent to', email, ':', info.response);
//     }
//   });
// };

// // Schedule sending emails using node-cron
// // emails.forEach((item, index) => {
//   const task = cron.schedule(
//     `${emails.minute} ${emails.hour} ${emails.date} ${emails.month} * `, // Run every 5 minutes, you can adjust this schedule
  
//     () => {
//       sendEmail(emails.email, emails.content);
//     },
//     {
//       scheduled: true,
//       timezone: 'UTC', // Adjust for your timezone
//     }
  
//   );
//   // emails.forEach((e) => {
//        console.log(emails.date,emails.minute,emails.hour,emails.month)
//   //   })

//   console.log(`Scheduled email job for recipient has been started.`);
// // }
// // );





