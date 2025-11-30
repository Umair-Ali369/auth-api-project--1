const mongoose = require('mongoose')

const connectDB = async () => {
    try {

        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected : ${connection.connection.host} `)

    } catch (err) {

        console.log("Error connecting to mongoDB : ", err.message)
        process.exit(1)

    }
}

module.exports = connectDB