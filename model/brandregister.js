const moongose = require('mongoose')

const brandSchema = new moongose.Schema({
    brandName:{
        type : String,
    required : [true, 'please enter your Company Name ']
    },
    isBrand : {
        type:Boolean,
        default:true
    },
    logo:{
        type : String,
        required :[true , 'please choese your logo ']
    },
    email:{
        type :String,
        required : [true , 'you need to register with E-mail adress']
    },
    pass:{
        type : String,
        required : [true , 'Fill your password ']
    }
})

module.exports= moongose.model('newBrand', brandSchema,'newUsers')