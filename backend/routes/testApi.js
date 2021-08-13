const router = require('express').Router();
const hello = require('../test/hello');

router.get("/test", hello.hello);

module.exports = router;