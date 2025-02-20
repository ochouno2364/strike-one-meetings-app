// DEPENDENCIES
const mongoose = require('mongoose');


// Create Meeting Schema
const meetingSchema = new mongoose.Schema({
    level: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    school: {
        type: String,
    }, 
    residence: {
        type: String,
        reuired: true,
    },
    status: {
        type: String,
        enum: ['Interested in Training', 'Looking for a Team', 'Just for Fun' ],
    },
});

// USER SCHEMA

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    meetings: [meetingSchema],
});


const User = mongoose.model('User', userSchema);

module.exports = User;