const express = require ('express');
const router= express.Router();

const userCtrl = require('../controllers/User');
const checker = require('../middleware/auth');
const authUser = require('../middleware/authUser');

router.get('/getAllUser', authUser, userCtrl.getAllUser);
router.post('/signup' ,checker.checkNotNullSignup, checker.checkEmail, userCtrl.signup);
router.post('/login',checker.checkNotNullLogin, checker.checkEmail, userCtrl.login);
router.delete('/accounts/:id',authUser, userCtrl.deleteAccount);

module.exports = router;