const express = require ('express');
const router= express.Router();


const postCtrl = require('../controllers/posts'); 
const authUser = require('../middleware/authUser');

router.get('/',authUser, postCtrl.getAllPosts);
router.post('/post',authUser, postCtrl.createPost);

module.exports = router;