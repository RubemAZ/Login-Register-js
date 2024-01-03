// Imports 

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

// Open/Public - Route
app.get('/' , (req, res) =>{
    res.status(200).json({msg: 'Welcome to API!'})
})

// Credencials
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS


mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.jmphwqv.mongodb.net/Mydatabase?retryWrites=true&w=majority`
).then( () => {
    app.listen(3000)
    console.log("Application connected to database successfully!")

}).catch( (err) =>  console.log(err) )

