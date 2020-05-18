var express = require('express');
var router = express.Router();
const auth = require('../middleware/auth')
const {postRegister, postLogin,BrandRegister} = require('../controller/auth') 

router.post('/register',  postRegister);
router.post('/b-register',  BrandRegister);
router.post('/login', postLogin);

//router.use(auth)

module.exports = router;
 