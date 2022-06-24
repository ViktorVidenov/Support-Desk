const path = require('path')
const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const colors = require('colors')
const { request } = require('http')

//Conect to databes-a 
connectDB()

const app = express()

//Get the body data from postman
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//End Point , Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

//Serve Frontend
if (process.env.NODE_ENV === 'production') {
    //Set build Folder as static
    app.use(express.static(path.join(__dirname, '../frontned/build')))

    app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))
} else {
    app.get('/', (req, res) => {
        res.status(200).json({ message: 'Welcome to the Support Desk API' })
    })
}


app.use(errorHandler);

app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) })