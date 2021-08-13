const models = require('../models');
const fs = require('fs');
const { send } = require('process');

exports.getAllPosts = async (req, res,) => {
    try{
        const posts = await models.Post.findAll({
            attributes: ['id', 'post', 'title', 'createdAt'],
            order: [["createdAt",'DESC']],
            include: [{
                    model: models.User,
                    attributes: ['name', 'id'],
                }],
        });
        res.status(200).send(posts);
    } catch (error) {
        return res.status(500).send({ error : "Une erreur c'est produite à la récupération des messages ! "});
    }
};

exports.createPost = async (req, res) => {
    //récupérer l'user_id
    // const user = await models.User.findOne({
    //     attributes: ['name', 'id'],
    //     where: { id: user_id},
    // });
    try{
        const post = await models.Post.create({
            include:[{
                model: models.User,
                attributes: [ 'name', 'id'],
            }],
            title: req.body.title,
            post : req.body.post,
            //remplacer l'id 1 par user.id
             UserId: 1,
        });

        
        res.status(201).json({ post: 'votre message est bien envoyé'});
     }catch(error) {
         return res.status(500).send(console.log(error));
     }
}