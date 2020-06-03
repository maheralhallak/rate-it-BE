
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
          comment.rating = req.body.rating;
          comment.userName = req.body.userName;
          console.log(req.body);
          
            comment.save().then((result,err) => {
              if (err) {
                  res.json({status:'failed', message: err});
              } else {
                  console.log('saved',result)
                  //We send whole contact list not just final person due to keep process simple.
                  Comment.find({referanceId:req.userId}).then((data, err)=>{
                      if (err) {
                          res.json({status:'failed', message: err});
                      } else  {
                        Comment.find({brandId:comment.brandId}).then((finalResult,err) => {
                            if ( finalResult ) { 
                                 res.json({status:'success', message:finalResult});
                            }else{
                                res.json({status:'fail', message:"Comment is added as well but you should refresh your page"}) }
                        });
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
module.exports.deleteComment =  async (req, res) => {
   const result = await Comment.findOneAndDelete({_id:req.params.id,authorId:req.userId});
   //console.log('aa',result,req.params.id)
   if ( result ) {
       const finalResult = await Comment.find({brandId:result.brandId});
       if ( finalResult ) { 
            res.json({status:'success', message:finalResult});
       }else          res.json({status:'fail', message:"Record is deleted but you should refresh your page"});
    }else          res.json({status:'fail', message:" Comment not Deleted"});
         
} 

