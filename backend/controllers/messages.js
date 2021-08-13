const models = require('../models');
const fs = require('fs');
const { send } = require('process');

exports.getAllMessages = async (req, res,) => {
    try{
        const messages = await models.Message.findAll({
            attributes: ['id', 'body', 'createdAt'],
            order: [["createdAt",'DESC']],
            include: [{
                    model: models.User,
                    attributes: ['name', 'id'],
                }],
        });
        res.status(200).send(messages);
    } catch (error) {
        return res.status(500).send({ error : "Une erreur c'est produite à la récupération des messages ! "});
    }
};

exports.createMessage = async (req, res) => {
    //récupérer l'user_id
    // const user = await models.User.findOne({
    //     attributes: ['name', 'id'],
    //     where: { id: user_id},
    // });
    try{
        const message = await models.Message.create({
            include:[{
                model: models.User,
                attributes: [ 'name', 'id'],
            }],
            body : req.body.body,
            //remplacer l'id 1 par user.id
             UserId: 1,
        });
        res.status(201).json({ post: 'votre message est bien envoyé'});
     }catch(error) {
         return res.status(500).send(console.log(error));
     }
}