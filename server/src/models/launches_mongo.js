const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
        default: 50,
    },
    launchDate: {
        type: Date,
        required: true, 
    },
    mission: {
        type: String,
        required: true,
    },
    rocket: {
        type: String,
        required: true,
    },
    target: {
        type: String,
        required: false,
    },   
    customers: {
        type: [ String ]
    },
    upcoming: {
        type: Boolean,
        required: true
    },
    success: {
        type: Boolean,
        required: true,
        default: true,
    }
 });

// Connects launchesSchema to the launches collection.
 module.exports = mongoose.model('Launch', launchesSchema);