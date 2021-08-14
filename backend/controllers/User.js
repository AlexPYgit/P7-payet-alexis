const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config({path: '.env'});
const SECRET_TOKEN = process.env.SECRET_TOKEN;

const models = require('../models');


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
        res.status(201).send({
          user: newUser,
           token: jwt.sign(
              { userId : user.id},
              SECRET_TOKEN,
              { expiresIn : '12h'}
            ),
          message: `Votre compte est bien créé ${newUser.name} !`,
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
          console.log(user.id)
          res.status(200).send({
            user: user,
            token: jwt.sign(
              { userId : user.id},
              SECRET_TOKEN,
              { expiresIn : '12h'}
            ),
            message: "Bonjour " + user.name + " !",
          });
        }
      }
    } catch (error) {
      return res.status(500).send(console.log(error));
    }
  };
  // { error: "Erreur serveur" }

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

  exports.updateAccount = async (req, res ) => {
    const id = req.params.id;
    console.log(id)
    try{
      // const userId = token.getUserId(req);
      let user = await models.User.findOne({ where : {id : id}});
      console.log(user.id)
      if( id == user.id) {
        if (req.body.name) {
          user.name = req.body.name;
        }
        if (req.body.email) {
          user.email = req.body.email;
        }
        if (req.body.password) {
          user.password = req.body.password;
        }
        const newUser = await user.save({ fields: ["name", "email", "password"] }); 
        res.status(200).json({
          user: newUser,
          messageRetour: "Votre profil a bien été modifié",
        });
      }else{
        return res.status(409).json({message :" Profil non modifié"})
      }
    }catch (error) {
      return res.status(500).json(console.log(error))
    }

  };
  // { message : " Erreur serveur"}