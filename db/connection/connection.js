const mongoose = require('mongoose')

const connection = async () => {
    try {
        const setConnection = await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`MongoDB connected: ${setConnection.connection.host}`)
    } catch (error) {
        console.log('D:')
    }
}

module.exports = connection