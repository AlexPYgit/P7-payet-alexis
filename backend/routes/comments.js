
const express = require ('express');
const router= express.Router();


const commentCtrl = require('../controllers/comments'); 

router.get('/allComment', commentCtrl.getAllComment);
router.post('/comment', commentCtrl.createComment);

module.exports = router;

