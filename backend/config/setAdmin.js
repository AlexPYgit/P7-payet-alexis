const models = require("../models");
const bcrypt = require("bcrypt");
require('dotenv').config({path: '.env'});
const EMAIL_ADMIN = process.env.EMAIL_ADMIN;
const NAME_ADMIN = process.env.NAME_ADMIN;
// Création du compte administrateur à la connexion s'il n'existe pas
function setAdmin(req, res) {
  models.User.findOne({ where: { email: EMAIL_ADMIN } || { name: NAME_ADMIN } })
    .then((user) => {
      if (!user) {
        bcrypt
          .hash("Moderator", 10)
          .then((hash) => {
            const admin = models.User.create({
              name: "admin",
              email: "admin@mail.com",
              password: hash,
              admin: true,
            })
              .then((admin) => {
                console.log({
                  admin,
                  message: `Votre compte admin est bien créé ${admin.name} !`,
                });
              })
              .catch((error) => {
                res.status(400).json({ error });
              });
          })
          .catch((error) => {
            res.status(500).send({ error });
          });
      } else {
        console.log({ message: "l'admin est déjà créé" });
      }
    })
    .catch((error) => {
      console.log({ error });
    });
}
module.exports = setAdmin();
