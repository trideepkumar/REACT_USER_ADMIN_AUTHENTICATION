const  User = require('../model/user');
const bcrypt = require("bcryptjs")

const signup = async (req, res, next) => {
    const {name,email,password} = req.body
    //for existing user validation (user EXIST OR NOT )
    let existingUser;
    try{
        existingUser = await User.findOne({email:email})
    }catch(err){
       console.log(err)
    }
    if(existingUser){
        return (
        res.status(400).json({message:'User already exist! LOGIN Instead'})
        )
    }
    // PASSWORD HASHING USING BCRYPTJS

    const hashedPassword = bcrypt.hashSync(password)
    const user = new User({
    name:name,
    email:email,
    password:hashedPassword
  });
  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({message:user})
};

const login = async(req,res,next)=>{
    const {email,password} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email:email})
        console.log(existingUser)
    }catch(err){
        console.log(err)
    }
    if(!existingUser){
      return res.status(400).json({message:"user not registered! SignUp please!"})
    }
    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password)
    if(!isPasswordCorrect){
       return res.status(400).json({message:"Invalid password!!"})
    }else{
        return res.json(200).json({message:"successfully logged in!"})
    }
}

exports.signup = signup;
exports.login = login;