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
        },
        rol: {
            type: ["admin", "profesor", "psicologo", "estudiante", "coordinador"],
            require: true,
            default: "estudiante"
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)