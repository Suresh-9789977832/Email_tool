const mongoose = require("mongoose")

const postschema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
        default:'sanddysuresh@gmail.com'
    },
    receiver: {
        type: [String],
        required:true
    },
    htmltemplate: {
        type: String,
        required:true
    },
    time: {
        type:Date,
        default:Date.now
    },

    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required:true
        } , 
    subject: {
        type: String,
        required:true
    }

})

const Postmodal = mongoose.model('Posts', postschema)

module.exports=Postmodal