const express = require ('express');
const router= express.Router();


const messageCtrl = require('../controllers/messages');
 

router.get('/', messageCtrl.getAllMessages);
router.post('/postMessage', messageCtrl.createMessage);

module.exports = router;