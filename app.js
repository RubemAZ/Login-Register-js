// Imports 

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

// Config JSON Response
app.use(express.json())

// Models
const User = require('./models/User')

// Open Route / Public Route
app.get('/' , (req, res) =>{
    res.status(200).json({msg: 'Welcome to API!'})
})

// Credencials
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

// Register User
app.post('/auth/register', async(req, res) => {

    const {name, email, password, confirmpassword} = req.body

    // Validations
    if (!name) {
        return res.status(422).json({msg: 'Insert your name!'})
    }

    if (!email) {
        return res.status(422).json({msg: 'Insert your email!'})
    }

    if (!password) {
        return res.status(422).json({msg: 'Insert your password!'})
    }

    if (!confirmpassword) {
        return res.status(422).json({msg: 'confirm your password!'})
    }
})


// Connection to database
mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.jmphwqv.mongodb.net/Mydatabase?retryWrites=true&w=majority`
).then( () => {
    app.listen(3000)
    console.log("Application connected to database successfully!")

}).catch( (err) =>  console.log(err) )

