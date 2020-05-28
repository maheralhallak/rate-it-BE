
const Comment = require('../model/comment');
const multer = require('multer');
const path = require('path');


let fileName;

const storage = multer.diskStorage({
    destination: 'public/images/',
    filename: function (req, file, cb) {
        fileName = 'a' + Date.now() + path.extname(file.originalname);
        cb(null, fileName)
    }
    })

const upload = multer({ 
    storage
}).single('picture');



module.exports.commentCreateOne = (req, res) => {
console.log('1')
    upload(req,res, (err) => {
        console.log(req.file)
      if (err instanceof multer.MulterError) {
          console.log('req',req.file);
      } else if ( ! err ) {
          // A Multer error occurred when uploading.
          
          const comment = new Comment();
          comment.brandId = req.body.brandId;
          comment.title = req.body.title;
          comment.content = req.body.content;
          comment.picture = req.file ? req.file.path.replace('public/images','') : null
          comment.authorId = req.userId; 
       
          
            comment.save().then((result,err) => {
              if (err) {
                  res.json({status:'failed', message: err});
              } else {
                  console.log('saved',result)
                  //We send whole contact list not just final person due to keep process simple.
                  Comment.find({referanceId:req.userId}).then((data, err)=>{
                      if (err) {
                          res.json({status:'failed', message: err});
                      } else {
                          res.json({status:'success', message: data}); 
                      }
                  });
              }
          });
      }
    
       else if (err) { 
          // An unknown error occurred when uploading.
          console.log(err);
      }
   
       /*  } */
})};

 module.exports.getHome = async (req, res) => {
  
    ////res.json({status:'success', message:`Hello Bilal! your id is ${req.userId}`});
    const comment = await Comment.find({brandId:req.params.brandId}) 
    res.json({status:'success', message:comment});
}

// delete .....if (comment.authorId === req.userId;)
module.exports.deleteComment =  (req, res) => {
   Comment.findOne({authorId:req.params.userId},()=> {
    if (comment.authorId === req.userId) {
            Comment.deleteOne({brandId:req.params.brandId}) 
            res.json({status:'success', message:" Comment Deleted"});
        } else if(err){throw err}
   })
    
} 
