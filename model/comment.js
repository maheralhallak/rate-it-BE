const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  
    brandId:{
        type: String,
    },
    productId:{
        type: String,
        
    },
    title:{
        type:String
    },
   content:{
       type:String
   },
   picture:{
       type:String
   },
   authorId:{
       type:String
   },
   rating:{
       type:Number
   },
   userName:{
       type:String
   }
})
module.exports = mongoose.model('comments', commentSchema);