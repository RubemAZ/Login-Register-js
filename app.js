require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");


const app = express();

const routes = require('./routes')

app.use(routes)

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.jmphwqv.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Successful database connection!");
    app.listen(3000);
  })
  .catch((err) => console.log(err));