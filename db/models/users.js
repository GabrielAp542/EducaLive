const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        lastname: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        username: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)