const models = require('../models');
const getUserId = require('../middleware/getUser');

//utilisé pour le developement de l'app
exports.getAllComment = async (req, res,) => {
    //faire en sorte de récupérer tout les commentaire d'un seul post
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
    const userId = getUserId(req);
    const postId = req.params.id
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
             UserId: userId,
             PostId: postId,
        });
        res.status(201).json({ post: 'Votre commentaire est bien envoyé'});
     }catch(error) {
         return res.status(500).send(console.log(error));
     }
}