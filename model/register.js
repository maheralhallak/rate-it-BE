const moongose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new moongose.Schema({
    fName:{
        type : String,
    required : [true, 'please enter your name ']
    },
    lName:{
        type :String,
        required : false
    },
    gender:{
        type : String,
        required :[true , 'please choese your gender ']
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

module.exports= moongose.model('newUsers', userSchema)