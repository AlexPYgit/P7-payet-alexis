
const express = require ('express');
const router= express.Router();


const commentCtrl = require('../controllers/comments'); 
const authUser = require('../middleware/authUser');


router.get('/allComment/post/:id',authUser, commentCtrl.getAllComment);
router.post('/comment/:id',authUser, commentCtrl.createComment);

module.exports = router;

