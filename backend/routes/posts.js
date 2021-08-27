const express = require ('express');
const router= express.Router();

const postCtrl = require('../controllers/posts'); 
const authUser = require('../middleware/authUser');

router.get('/',authUser, postCtrl.getAllPosts);
router.get('/getOnePost/:id',authUser, postCtrl.getOnePost);
router.post('/post',authUser, postCtrl.createPost);
router.delete('/:id',authUser, postCtrl.deletePost);

module.exports = router;