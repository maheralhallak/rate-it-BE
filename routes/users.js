var express = require('express');
var router = express.Router();
const auth = require('../middleware/auth')
const {postRegister, postLogin} = require('../controller/auth') 

router.post('/register',  postRegister);
router.post('/login', postLogin);
router.post('/brands', auth.checkAuth, (req,res)=>{
    console.log(req.userId);
    res.send('Authenticated')
})
//router.use(auth)

module.exports = router;
 