const mongoose = require("mongoose")

const Userschema = new mongoose.Schema({
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    confirmpassword: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required:true
    }
})

const Usermodal = mongoose.model('Users', Userschema)

module.exports=Usermodal