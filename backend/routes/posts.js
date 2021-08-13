const express = require ('express');
const router= express.Router();


const postCtrl = require('../controllers/posts'); 

router.get('/', postCtrl.getAllPosts);
router.post('/post', postCtrl.createPost);

module.exports = router;