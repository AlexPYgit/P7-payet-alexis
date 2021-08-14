const jwt = require('jsonwebtoken');
require('dotenv').config({path: '.env'});
const SECRET_TOKEN = process.env.SECRET_TOKEN;

module.exports = (req) => {
    const token = req.headers.authorization.split(" ")[1]; 
    const decodedToken = jwt.verify(token, SECRET_TOKEN); 
    const userId = decodedToken.userId;
    return userId; // on récupère l'id du token
  }
  
 