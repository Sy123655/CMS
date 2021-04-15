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
    
    // commentIsApproved: {
    //     type: Boolean,
    //     default: false
    // },
    


});

module.exports = {Upload: mongoose.model('upload', UploadSchema)};