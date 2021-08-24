const jwt = require('jsonwebtoken');
require('dotenv').config({path: '.env'});
const SECRET_TOKEN = process.env.SECRET_TOKEN;


//vérifi le token d'authentification de l'utilisateur
module.exports = (req, res, next) => { 
    const getToken = req.headers.authorization;
    try {
        const token = getToken;
        const decodedToken = jwt.verify(token, SECRET_TOKEN); 
        const userId = decodedToken.userID;  
        if (req.body.userId && req.body.userId !== userId) { 
            throw 'User id non valable !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: 'Invalid request !' });
    }
};
