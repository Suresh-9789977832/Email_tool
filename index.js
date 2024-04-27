const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const cors = require("cors")
const app = express()
const mongoose=require("mongoose")
const userRouter = require("./Routes/UserRouter")
const postrouter = require("./Routes/PostRouter")
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const schedulemodal = require("./Modal/Schedulemodal")


app.use(cors())
app.use(express.json())
app.use('/user', userRouter)
app.use('/post', postrouter)



// Array of email data
// let data =  schedulemodal.find()
//     console.log(data)
    


mongoose.connect(`${process.env.DB_URL}`)

app.get('/', (req, res) => { 
    res.json("Hello welcome to the world of nodejs")
})

app.listen(process.env.PORT || process.env.NEWPORT, () => console.log(`app lisiting in ${process.env.PORT}`))