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
    }
    


});

module.exports = {Upload: mongoose.model('upload', UploadSchema)};