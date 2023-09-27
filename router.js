const express = require('express')
const router = express.Router()

const users = require('./api/users')

router.post('/api/users', users.createUser)
router.get('/api/users', users.findUsers)


module.exports = router