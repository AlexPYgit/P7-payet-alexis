const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config({path: '.env'});
const SECRET_TOKEN = process.env.SECRET_TOKEN;
const { Op } = require("sequelize");
const models = require('../models');

// création du Token
const nowInTimestamp = () => Math.round(new Date().getTime() / 1000);
const now = nowInTimestamp();
const generateJWT = (now, userID) => {
  return jwt.sign(
    {
      exp: now + 60*60*4, // 4h
			userID,
		},
		SECRET_TOKEN
    );
  };

//Création du compte avec envoie du token
exports.signup = async (req, res) => {
    try {
      const userCreate = await req.body;
      const user = await models.User.findOne({
        where: { email: req.body.email },
      });
      if (user !== null) {
        if (user.name === userCreate.name) {
          return res.status(400).json({ error: "ce nom est déjà utilisé" });
        }
      } else{
        const hash = await bcrypt.hash(userCreate.password, 10);
        const newUser = await models.User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          admin: false,
        });
        const user = await models.User.findOne({
          where: { email: req.body.email },
        });
        const jwt = generateJWT(now, user.id);
        res.status(201).send({
          user: newUser,
          token: `${jwt}`
          // jwt.sign(
          //   { userId : user.id},
          //   SECRET_TOKEN,
          //   { expiresIn : '12h'}
          // )
          ,
          message: `Votre compte est bien créé ${newUser.name} !`,
        });
      }
    } catch (error) {
      return res.status(400).send({ error: "erreur de création de compte" });
    }
  };

  //Connexion à son compte avec envoie du token 
  exports.login = async (req, res) => {
    try {
      const user = await models.User.findOne({
        where: { email: req.body.email },
      }); // on vérifie que l'adresse mail figure bien dan la bdd
      if (user === null) {
        return res.status(403).send({ error: "Connexion échouée" });
      } else {
        const hash = await bcrypt.compare(req.body.password, user.password); // on compare les mots de passes
        if (!hash) {
          return res.status(401).send({ error: "Mot de passe incorrect !" });
        } else {
          const jwt = generateJWT(now, user.id);
          res.status(200).send({
            user: user,
            token: `${jwt}`,
            admin: user.admin,
            message: "Bonjour " + user.name + " !",
          });
        }
      }
    } catch (error) {
      return res.status(500).send({ error: "Erreur serveur" });
    }
  };

  //supression de compte de l'utillisateur
  exports.deleteAccount = async (req, res) => {
    try{
      const id = req.params.id;
      const user = await models.User.findOne({ where : {id : id} });
      if(user == null) {
        return res.status(409).json({ message : "Ce compte n'éxiste pas ! "})
      }else{
        models.User.destroy({ where : { id : id}});
        res.status(200).json({message : 'Compte utilisateur suprimé ! '})
      }
    } catch(error) {
        return res.status(500).send({error :"Le compte n'a pas pus être trouvé ! "})
      } 
  };

  //Retourne tout les comptes des utilisateurs pour l'administrateur
  exports.getAllUser = async (req, res) => {
    try{
      const users = await models.User.findAll({
        attributes : [ "name", 'id', 'email', 'createdAt'],
        where: { 
          admin: {
            [Op.not]: 1,
          }
        }
      });
      res.status(200).send(users);
    }catch (error){
      return res.status(500).json(console.log(error));
    }
  };