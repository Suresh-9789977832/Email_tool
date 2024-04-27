const Postmodal = require("../Modal/Postmodal");
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken");
const schedulemodal = require("../Modal/Schedulemodal");
const cron = require("node-cron");


const manualEmail = async(req,res) => {
    try {
        let receiver = req.body.receiver
        let subject=req.body.subject
        let htmltemplate = req.body.htmltemplate
      let token = req.params.token
        
      console.log(receiver,subject,htmltemplate,process.env.USER,process.env.PASS)
        if (receiver && subject && htmltemplate) {
            const transporter = nodemailer.createTransport({
              service: "gmail",
              port: 465,
              secure: true,
              logger: true,
              debug: true,
                auth: {
                    user: process.env.USER,
                    pass: process.env.PASS
              },
              tls: {
                  rejectUnauthorized:true
                }
            });
          
                var mailoption={
                  from: `${process.env.USER} <${process.env.USER}>`,
                  to:receiver,
                  subject:subject,
                  text: htmltemplate,
            };
            
            transporter.sendMail(mailoption,  async(error, info)=>{
                if (error) {    
              console.log(error);
                } else {
                    if (token) {
                        await jwt.verify(token, process.env.SECRET_KEY, async(err, data) => {
                            if (err) {
                                res.status(498).send({
                                    message:"Token expired"
                                })
                            }
                            else {
                                await Postmodal.create({ subject, htmltemplate, receiver,userid:data.id})
                            }
                      })
                    }
                    else {
                        res.status(401).send({
                            message:"no token"
                        })
                    }
                return res.send({
                    message: "Mail send successfully please check your mail"
             })
            }
          });
    
        }
        else {
            res.status(400).json('fill all the field')
        }

    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            error:error.message
      })
    }
}

const postexcelfile = async(req,res) => {
    try {
        const content = req.body.content
        const subject = req.body.subject
        const final = req.body.final
        const token=req.params.token

        if (content && subject && final) {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.USER,
                    pass: process.env.PASS
                },
              });
          
                var mailoption={  
                  from: `${process.env.USER} <${process.env.USER}>`,
                  to:final,
                  subject:subject,
                  text: content,
            };
            
            transporter.sendMail(mailoption,  async(error, info)=>{
                if (error) {    
              console.log(error);
                } else {
                    if (token) {
                        await jwt.verify(token, process.env.SECRET_KEY, async(err, data) => {
                            if (err) {
                                res.status(498).send({
                                    message:"Token expired"
                                })
                            }
                            else {
                                await Postmodal.create({ subject,htmltemplate:content,receiver:final,userid:data.id})
                            }
                      })
                    }
                    else {
                        res.status(401).send({
                            message:"no token"
                        })
                    }
                return res.send({
                    message: "Mail send successfully"
             })
            }
          });
    
        }
        else {
            res.status(400).json('fill all the field')
        }


    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            error:error.message
      })
    }
}

 const scheduleemail = async(req,res) => {
   try {
     let subject = req.body.newEvent.subject
     let minute = req.body.newEvent.minute
     let hour = req.body.newEvent.hour
     let day = req.body.newEvent.day
     let month = req.body.newEvent.month
     let receiver = req.body.newEvent.receiver
     let content = req.body.newEvent.content

     if (minute && subject && content && receiver && month && day && hour) {
      await schedulemodal.create({ minute, title: subject, content, receiver, month, day, hour })
      let datas = await schedulemodal.find()
      datas.forEach(data => {
        cron.schedule(
          `${data.minute} ${data.hour} ${data.day} ${data.month} *`,
          () => {
            sendEmail(data);
          },
          {
            scheduled: true,
            timezone: "Asia/Kolkata"
          }
        );
      });
             
      function sendEmail(data) {
        let transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: process.env.USER,
            pass: process.env.PASS
          },
        });
             
        let mailOptions = {
          from: `${process.env.USER} <${process.env.USER}>`,
          to: data.receiver,
          subject: subject,
          text: data.content,
        };
             
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log('Error sending email:', error);
          } else {
            console.log('Email sent:', info.response);
          }
        });
      }
             
      res.json(datas)
     }
     else {
       res.status(400).send({
         message:"Fill all the field"
       })
     }
     
    
    } 
    catch (error) {
        res.status(500).send({
            message: "Internal server error",
            error:error.message
      })
    }
}

const getallscheduled = async (req, res) => {
    try {
        let data = await schedulemodal.find()
        res.json(data)
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            error:error.message
      })
    }
}



module.exports = {
    manualEmail,
    postexcelfile,
    scheduleemail,
    getallscheduled
}




