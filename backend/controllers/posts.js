const models = require('../models');
const getUserId = require('../middleware/getUser');

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
        res.status(201).json({ post: 'votre message est bien envoyé'});
     }catch(error) {
         return res.status(500).send(console.log(error));
     }
}