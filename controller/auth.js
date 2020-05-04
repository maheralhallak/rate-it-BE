const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY; 
const User = require('../model/register');
const bcrypt = require('bcrypt');

const signToken = id => {
    return jwt.sign({id}, jwtSecretKey, {expiresIn: "6d"});
}


exports.postRegister = async (req,res) => {
    let {fName,lName, gender, email , pass} = req.body;
    let checkUser = await User.findOne({email});

    if (checkUser) {
        res.json({status: 'failed', message: 'this accout already exists'});
        return;
    };
    pass = await bcrypt.hash(pass,10)

    const newUser = new User ({
        fName,
        lName,
        gender,
        email,
        pass
    });

    newUser.save((err)=>{
        if (err) {
            res.json({status:'failed', message: err});
        }else{
            res.json({status:'success', message: 'Welcome to RateIt'});
        }
    });
}

exports.postLogin = (req,res) =>{
let {email, pass } = req.body;
console.log(email);
/* pass = bcrypt.hash(pass,10) */

User.findOne({email} , (err,result) =>{
    
    console.log(email, pass , result.pass);
    if (err) {
        res.json({status: "failed" ,  message: err})
    }else if (!result) {
        res.json({status : "failed" , message: "email or password are wrong"})
    }else {
        
        bcrypt.compare(pass , result.pass).then(async (isPassCorrect) =>{
            if(isPassCorrect){
                const token = await signToken(result.id);
                res.json({
                    status : "success",
                    message : "you logged in !!",
                    token
                });
            } else res.json({status: "failed", message: "email or password are wrong!"});
        });
    }
});
}