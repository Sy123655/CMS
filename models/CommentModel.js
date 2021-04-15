const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({

    body: {
        type: String,
        required: true
    },

    file: {
        type: Schema.Types.ObjectId,
        ref: 'upload'
    },

    date: {
        type: Date,
        default: Date.now()
    },
    



});

module.exports = {Comment: mongoose.model('comment', CommentSchema)};