const mong = require('mongoose');

const userSchema = new mong.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    elo: {
        type: Number,
        required: true,
        default: 1500,
    },
    dev: {
        type: Number,
        required: true,
        default: 350,
    },
    verified: {
        type: Boolean,
        required: true,
        default: false,
    },
    verification: {
        type: String,
        required: false,
    },
});

const userModel = mong.model('users', userSchema);

module.exports = {userModel};
