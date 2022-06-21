const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const colors = require('colors')

//Conect to databesa 
connectDB()

const app = express()

//Get the body data from postman
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Support Desk API' })
})

// app.get('/', (req, res) => {
//     res.status(200).json({ message: 'Welcome to the Support Desk API' })
// })

//End Point , Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

app.use(errorHandler);

app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) })