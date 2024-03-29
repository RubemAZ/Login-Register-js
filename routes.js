const bcrypt = require("bcrypt");
const express = require("express");
const app = express();

const {generateToken, checkToken} = require('./token-manager')

// models
const User = require("./models/User");

// Config JSON response
app.use(express.json());

// Open Route
app.get("/", (req, res) => {
    res.status(200).json({ msg: "Welcome to API!" });
});

// Private Route
app.get("/user/:id", checkToken, async (req, res) => {
    const id = req.params.id;

    // check if user exists
    const user = await User.findById(id, "-password");

    if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    res.status(200).json({ user });
});


app.post("/auth/register", async (req, res) => {
    const { name, email, password, confirmpassword } = req.body;
  
    // validations
    if (!name) {
      return res.status(422).json({ msg: "O nome é obrigatório!" });
    }
  
    if (!email) {
      return res.status(422).json({ msg: "O email é obrigatório!" });
    }
  
    if (!password) {
      return res.status(422).json({ msg: "A senha é obrigatória!" });
    }
  
    if (password != confirmpassword) {
      return res
        .status(422)
        .json({ msg: "A senha e a confirmação precisam ser iguais!" });
    }
  
    // check if user exists
    const userExists = await User.findOne({ email: email });
  
    if (userExists) {
      return res.status(422).json({ msg: "Por favor, utilize outro e-mail!" });
    }
  
    // create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
  
    // create user
    const user = new User({
      name,
      email,
      password: passwordHash,
    });
  
    try {
      await user.save();
  
      res.status(201).json({ msg: "Usuário criado com sucesso!" });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  });
  
app.post("/auth/login", async (req, res) => {
const { email, password } = req.body;

// validations
if (!email) {
    return res.status(422).json({ msg: "O email é obrigatório!" });
}

if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória!" });
}

// check if user exists
const user = await User.findOne({ email: email });

if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
}

// check if password match
const checkPassword = await bcrypt.compare(password, user.password);

if (!checkPassword) {
    return res.status(422).json({ msg: "Senha inválida" });
}

try {
    const token = generateToken(user)

    res.status(200).json({ msg: "Autenticação realizada com sucesso!", token });
} catch (error) {
    res.status(500).json({ msg:'xxx', error });
}
});

module.exports = app