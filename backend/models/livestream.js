const mongoose = require('mongoose');


const streamSchema = new mongoose.Schema(
    {
        educatorname: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        topic: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        streamlink: {
            type: String,
            required: true
        },
        about: {
            type: String,
            trim: true
        },
        schedule: {
            type: Date,
            default: Date.now
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model('stream', streamSchema);