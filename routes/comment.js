var express = require('express');
var router = express.Router();
var comment =require('../controller/comment')
const auth = require('../middleware/auth')

//router.get('/brands' ,comment.commentPoster);

router.post('/' , auth.checkAuth,comment.commentCreateOne);
router.get('/:brandId', auth.checkAuth,comment.getHome);
router.get('/:brandId/:productId', auth.checkAuth,comment.getHome)
router.get('/delete', auth.checkAuth,comment.deleteComment),
//router.get('/comment' ,comment.commentCreateOne);
//router.delete('/brands/:id' ,comment.commentDeleteOne);
module.exports = router;
 