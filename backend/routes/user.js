const express = require ('express');
const router= express.Router();

const userCtrl = require('../controllers/User');
const checker = require('../middleware/auth');

router.post('/signup' ,checker.checkNotNull, checker.checkEmail, userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/accounts/:id', userCtrl.deleteAccount);
router.put('/accounts/:id', userCtrl.updateAccount);



module.exports = router;