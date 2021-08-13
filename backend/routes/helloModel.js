const express = require ('express');
const router= express.Router();

const helloCtrl = require('../controllers/hello');

router.post('/helloModel' , helloCtrl.helloModel);

module.exports = router;