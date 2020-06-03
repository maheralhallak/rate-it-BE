const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY; 
const User = require('../model/register');
const bcrypt = require('bcrypt');
const multer = require('multer')
const Brand = require('../model/brandregister')
const path =require('path')
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


const storage = multer.diskStorage({
    destination: 'public/images/',
    filename: function (req, file, cb) {
        fileName = 'a' + Date.now() + path.extname(file.originalname);
        cb(null, fileName)
    }
    })

const upload = multer({ 
    storage
}).single('logo');


exports.BrandRegister = async (req,res) => {
    
    upload(req,res, async (err) => {
        let {brandName, logo, email , pass} = req.body;
        let checkUser = await User.findOne({email});
        console.log(req.file)
      if (err instanceof multer.MulterError) {
          console.log('req',req.file);
      } else if ( ! err ) {
    if (checkUser) {
        res.json({status: 'failed', message: 'this accout already exists'});
        return;
    };
    pass = await bcrypt.hash(pass,10)

    const newBrand = new Brand ({
        brandName,
        logo  : req.file ? req.file.path.replace('public/images','') : null,
        email,
        pass
    });

    newBrand.save((err)=>{
        if (err) {
            res.json({status:'failed', message: err});
        }else{
            res.json({status:'success', message: 'Welcome to RateIt'});
        }
    });
}})}


exports.postLogin = async (req,res) =>{
let {email, pass } = req.body;
console.log(req.body);
/* pass = bcrypt.hash(pass,10) */

await User.findOne({email} , (err,result) =>{
    
    console.log(result);
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
                    token,
                    fullName: result.fName + " " +  result.lName
                });
            } else res.json({status: "failed", message: "email or password are wrong!"});
        });
    }
});
}