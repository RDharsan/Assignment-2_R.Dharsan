const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const todoSchema = new Schema({

    taskTitle: {
        type: String,
        required: true
    },
    
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    when:{
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Todo', todoSchema)