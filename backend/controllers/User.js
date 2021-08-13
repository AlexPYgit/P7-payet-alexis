const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config({path: '.env.local'});
const SECRET_TOKEN = process.env.SECRET_TOKEN;
const connectDB = require('../models');
const { Op } = require("sequelize");
const models = require('../models');
const fs = require("fs");


exports.signup = async (req, res) => {
    try {
      console.log('hello');
      console.log(await req.body.email);
      const user = await models.User.findOne({
        where: { email: req.body.email },
      });
      if (user !== null) {
        if (user.name === req.body.name) {
          return res.status(400).json({ error: "ce pseudo est déjà utilisé" });
        }
      } else {
        const hash = await bcrypt.hash(req.body.password, 10);
        const newUser = await models.User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash,
           admin: false,
        });
  
        // const tokenObject = await token.issueJWT(newUser);
        res.status(201).send({
          user: newUser,
        //   token: tokenObject.token,
        //   expires: tokenObject.expiresIn,
          message: `Votre compte est bien créé ${newUser.pseudo} !`,
        });
      }
    } catch (error) {
      return res.status(400).send({ error: "email déjà utilisé" });
    }
  };


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
        //   const tokenObject = await token.issueJWT(user);
          res.status(200).send({
            // on renvoie le user et le token
            user: user,
            // token: tokenObject.token,
            // sub: tokenObject.sub,
            // expires: tokenObject.expiresIn,
            message: "Bonjour " + user.name + " !",
          });
        }
      }
    } catch (error) {
      return res.status(500).send({ error: "Erreur serveur" });
    }
  };