const express = require("express")
const { manualEmail, postexcelfile, scheduleemail, getallscheduled } = require("../Controller/Postcontroller")
const postrouter = express.Router()



postrouter.post('/email/:token', manualEmail)

postrouter.post('/postfile/:token', postexcelfile)

postrouter.post('/schdeule', scheduleemail)

postrouter.get('/getschedule',getallscheduled)



module.exports=postrouter