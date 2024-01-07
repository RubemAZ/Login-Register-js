const jwt = require("jsonwebtoken");

function checkToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) {
        throw new Error('Token inválido')
    }
  
    try {
      const secret = process.env.SECRET;
  
      jwt.verify(token, secret);

    } catch (err) {
        throw new Error('Token inválido')
    }
  }

const generateToken = (user) =>{
  const gentoken = jwt.sign(
    {
        id: user._id,
        name: user.name,
        email: user.email
    },
    process.env.SECRET
    );
  return gentoken
}

module.exports = {
  generateToken,
  checkToken
}

