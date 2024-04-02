const bcryptjs = require("bcryptjs")
const jwt=require("jsonwebtoken")

const hashedpassword = async (password) => {
    let salt = await bcryptjs.genSalt(10)
    let hashpass = await bcryptjs.hash(password,salt)
    return hashpass
}

const comparepassword = async (password,newpassword) => {
    let comparepass = await bcryptjs.compare(password, newpassword)
    return comparepass
}

const createtoken = async (value) => {
    let token = await jwt.sign(value, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRE })
    return token
}


module.exports = {
    hashedpassword,
    comparepassword,
    createtoken
}