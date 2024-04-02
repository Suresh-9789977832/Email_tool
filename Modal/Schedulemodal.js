const mongoose = require("mongoose")

const scheduleschema = new mongoose.Schema({
    end: {
        type: Date,
        required:true
    },
    start: {
        type: Date,
        required:true
    },
    title: {
        type: String,
        required:true
    },
    minute: {
        type: Number,
        required:true  
    },
    hour: {
        type: Number,
        required:true  
    },
    day: {
        type: Number,
        required:true  
    },
    month: {
        type: Number,
        required:true  
    },
    receiver: {
        type: [String],
        required:true
    },
    content: {
        type: String,
        required:true
    }
})

const schedulemodal = mongoose.model('schedule', scheduleschema)

module.exports=schedulemodal