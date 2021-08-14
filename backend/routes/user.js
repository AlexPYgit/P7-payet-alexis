const express = require ('express');
const router= express.Router();

const userCtrl = require('../controllers/User');
const checker = require('../middleware/auth');
const authUser = require('../middleware/authUser');


router.post('/signup' ,checker.checkNotNull, checker.checkEmail, userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/accounts/:id',authUser, userCtrl.deleteAccount);
router.put('/accounts/:id',authUser, userCtrl.updateAccount);



module.exports = router;