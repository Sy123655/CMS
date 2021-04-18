const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoordinatorSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

});

module.exports = { Coordinator: mongoose.model('coordinator', CoordinatorSchema) };