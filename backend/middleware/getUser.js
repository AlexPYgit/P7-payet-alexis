const jwt = require('jsonwebtoken');
require('dotenv').config({path: '.env'});
const SECRET_TOKEN = process.env.SECRET_TOKEN;

//permet de récupérer l'id de l'utilisateur
module.exports = (req) => {
    const getToken = req.headers.authorization;
    const token = getToken;
    const decodedToken = jwt.verify(token, SECRET_TOKEN); 
    const userId = decodedToken.userID;
    console.log("user id dans le get user", userId)
    return userId; // on récupère l'id du token
  };
  
 