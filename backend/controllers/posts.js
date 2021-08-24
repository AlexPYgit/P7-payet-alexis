const models = require('../models');
const getUserId = require('../middleware/getUser');

//Retourn tout les posts créé
exports.getAllPosts = async (req, res,) => {
    try{
        const posts = await models.Post.findAll({
            attributes: ['id', 'post', 'title', 'createdAt'],
            order: [["createdAt",'DESC']],
            include: [
                {
                    model: models.User,
                    attributes: ['name', 'id'],
                },
                {
                    model: models.Comment,
                    attributes : ['content', 'id', 'createdAt', 'UserId'],
                    order: ['createdAt', 'DESC'],
                    include: [{
                        model: models.User,
                        attributes: ['name'],
                    }]
                }
            ],
        });
        res.status(200).send(posts);
    } catch (error) {
        return res.status(500).send({ error : "Une erreur c'est produite à la récupération des messages ! "});
    }
};

//Retourne un seul post pour affiche le post avec tout les commentaires 
exports.getOnePost = async (req, res ) => {
    try{
        const post = await models.Post.findOne({
            where : { id : req.params.id},
            include: [
                {
                    model : models.User,
                    attributes: [ 'name', 'id', 'createdAt']
                },
                {
                    model: models.Comment,
                    attributes: [ 'createdAt','content', 'Userid'],
                    order: ["createdAt", 'DESC'],
                    include: [
                        {
                            model: models.User,
                            attributes: ['name']
                        }
                    ]
                }
            ]
        })
        res.status(200).send(post)
    }catch (error){
        return rs.status(500).json({error : "Le post n'éxiste pas"})
    }
};


//Permet le création de post
exports.createPost = async (req, res) => {
   const userId = getUserId(req);
    try{
        const post = await models.Post.create({
            include:[{
                model: models.User,
                attributes: [ 'name', 'id'],
            }],
            title: req.body.title,
            post : req.body.post,
             UserId: userId,
        });
        res.status(201).json({ post: 'Votre message est bien envoyé'});
     }catch(error) {
         return res.status(500).json({message : "Votre post n'a pas pus être envoyé"});
     }
};


//Supression de post par le créateur ou par l'admin
exports.deletePost = async (req, res) => {
    console.log(req.body)
    try{
        const userId = getUserId(req);
        const verifyAdmin = await models.User.findOne({ where: { id : userId}});
        const post = await models.Post.findOne({where: {id : req.params.id}});
        if(post.UserId === userId || verifyAdmin.admin === true){
            models.Comment.destroy({ 
                where : { PostId : post.id} });
            models.Post.destroy({ 
                where : { id : post.id},
            });
            res.status(200).json({ message : "Le post à bien été suprimé."})
        }else {
            res.status(400).json({ message : "Vous n'avez pas les autorisation pour suprimer ce post."})
        }
    } catch(error) {
        return res.status(500).json(console.log(error))
    }
};