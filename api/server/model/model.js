const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    quantity: {
        type: String, 
        required: true,
    },
    status: {
        type: String,
    },
});

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;
