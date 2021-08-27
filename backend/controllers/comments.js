const models = require('../models');
const getUserId = require('../middleware/getUser');

//  récupére tout les commentaires d'un seul post
exports.getAllComment = async (req, res,) => {
    try{
        const idPostComent = req.params.id;
        const comment = await models.Comment.findAll({
            where : {PostId : idPostComent},
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
         console.log(comment)
        res.status(200).send(comment);
    } catch (error) {
        return res.status(500).send( { error : "Une erreur c'est produite à la récupération des commentaires ! "});
    }
}; 


//Création de commentaire sur un sujet
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
};

// Suprimer son commentaire
exports.deleteComment= async (req, res)=> {
    const userId = getUserId(req);
    const commentId = req.params.id;
    try {
        const verifyAdmin = await models.User.findOne({ where: { id : userId}});
        const comment = await models.Comment.findOne({where: {id : commentId}});
        if(comment.userId === userId || verifyAdmin.admin === true){
            models.Comment.destroy({ 
                where : { id : comment.id} });
            res.status(200).json({ message : "Le commentaire à bien été suprimé."})
        }else {
            res.status(400).json({ message : "Vous n'avez pas les autorisation pour suprimer ce post."})
        }
    } catch (error) {
        res.status(500).json({ message : "Un problème est survenue au moment de la supréssion du commentaire."})
    }
};