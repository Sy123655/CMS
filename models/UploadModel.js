const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UploadSchema = new Schema({

    file: {
        type: String,
        default: ''
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    date: {
        type: Date,
        default: Date.now()
    },
    
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'comment'
    },
    comment1: {
        type: String,
        default: true,
    },
    comment2: {
        type: String,
        default: true,
    },
    mark: {
        type: String,
        default: true,
    }
    
    


});

module.exports = {Upload: mongoose.model('upload', UploadSchema)};