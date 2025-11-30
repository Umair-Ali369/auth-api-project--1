const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const  authRouter  = require('./routes/authRouter')

const app = express() 
//body parser
app.use(express.json())

dotenv.config()

//connection of mongoDB
connectDB()

// test route
app.use('/api/auth', authRouter)

//listen server
const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})