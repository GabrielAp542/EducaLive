const users = require('../db/models/users')
const passwordValidation = require('../helpers/validations/password')
const bcrypt = require('bcrypt')

exports.createUser = async (req, res) => {
    if (!req.body.name || !req.body.lastname || !req.body.email || !req.body.username || !req.body.password || !req.body.confirmation) {
        return res.send('empty')
    }
    let saveUser

    const name = req.body.name
    const lastname = req.body.lastname
    const email = req.body.email
    const password = req.body.password
    const username = req.body.username
    const confirmation = req.body.confirmation

    if (!name.trim() || !lastname.trim() || !email.trim() || !password.trim() || !username.trim()) {
        return res.send('empty')
    }

    if (password.trim() != confirmation.trim()) {
        return res.send('coincidencia')
    }

    const usuario = await passwordValidation.passwordValidation(password, username, email)

    if (usuario) {
        return res.send('password')
    }

    if (email.includes('@') == false || email.includes('.') == false) {
        return res.send('email')
    }

    const hash = await bcrypt.hashSync(password, 10)

    if (req.session.username && req.session.rol == 'admin') {
        if (!req.body.status || !req.body.rol) {
            return res.send('empty')
        }

        const rol = req.body.rol
        const status = req.body.status

        if (!status.trim() || !rol.trim()) {
            return res.send('empty')
        }

        const newUser = new users({
            name: name,
            lastname: lastname,
            email: email,
            username: username,
            password: hash,
            rol: rol,
            status: status
        })

        saveUser = await newUser.save()

        if (!saveUser) {
            return res.send(false)
        } else {
            return res.send(true)
        }

    } else {
        const newUser = new users({
            name: name,
            lastname: lastname,
            email: email,
            username: username,
            password: hash
        })

        saveUser = await newUser.save()

        if (!saveUser) {
            return res.send(false)
        } else {
            return res.send(true)
        }
    }
}

exports.findUsers = async (req, res) => {
    const find = await users.find().exec()
    if (!find.length) {
        res.send('find')
    } else {
        res.send(find)
    }
    
}