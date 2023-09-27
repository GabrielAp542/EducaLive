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
            type: ["admin", "profesor", "psicologo", "estudiante"],
            require: true,
            default: "estudiante"
        },
        status: {
            type: ["activo", "inactivo", "baneado"],
            require: true,
            default: "activado"
        },
        authentication: {
            type: ["activo", "inactivo"],
            require: true,
            default: "inactivo"
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const users = new mongoose.model('users', usersSchema)

module.exports = users