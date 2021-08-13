const models = require('../models');
const fs = require('fs');
const { send } = require('process');

exports.getAllComment = async (req, res,) => {
    try{
        const comment = await models.Comment.findAll({
            attributes: ['id', 'content', 'createdAt'],
            order: [["createdAt",'DESC']],
            include: [
                {
                    model: models.User,
                    attributes: ['name', 'id'],
                },
                {
                    model:models.Post,
                    attributes: ['id', 'title'],
                },
            ],
        });
        res.status(200).send(comment);
    } catch (error) {
        return res.status(500).send( { error : "Une erreur c'est produite à la récupération des commentaires ! "});
    }
}; 

exports.createComment = async (req, res) => {
    //récupérer l'userId
    // const user = await models.User.findOne({
    //     attributes: ['name', 'id'],
    //     where: { id: userId},
    // });
    try{
        const post = await models.Comment.create({
            include:[
                {
                model: models.User,
                attributes: [ 'name', 'id'],
                },
                {
               model: models.Post,
               attributes: ['title', 'id'],
                }
            ],
            content : req.body.content,
            //remplacer l'id 1 par userId
             UserId: 1,
             PostId: 1,
        });
        res.status(201).json({ post: 'Votre commentaire est bien envoyé'});
     }catch(error) {
         return res.status(500).send(console.log(error));
     }
}