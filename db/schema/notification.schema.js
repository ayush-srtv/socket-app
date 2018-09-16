const mongoose = require('mongoose')
const {Schema} = mongoose
const {ObjectId} = Schema

const Notification = new Schema({
    id:ObjectId,
    by: { type: String, default:'anonymous' },
    message: { type: String, default:'message' },
    time:{ type:Date, default: Date.now },
})

module.exports = { Notification }