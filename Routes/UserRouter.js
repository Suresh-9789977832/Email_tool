const express = require("express")
const { Signup, login,refresh } = require("../Controller/Usercontroller")
const userRouter = express.Router()


userRouter.post('/Signup', Signup)

userRouter.post('/login', login)

userRouter.get('/refreshuser/:id',refresh)

module.exports=userRouter