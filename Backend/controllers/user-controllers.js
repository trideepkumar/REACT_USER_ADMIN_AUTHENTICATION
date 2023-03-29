const  User = require('../model/user');
const bcrypt = require("bcryptjs");
const jwt  = require("jsonwebtoken");


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
    console.log('hello')
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({message:user})
}

const login = async(req,res,next)=>{
    const {email,password} = req.body;
    let existingUser;
    try{
      console.log('loginworks')
        existingUser = await User.findOne({email:email})
        console.log(existingUser);
    }catch(err){
        console.log(err)
    }
    if(!existingUser){
      return res.status(400).json({message:"user not registered! SignUp please!"})
    }
    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password)
    if(!isPasswordCorrect){
       return res.status(400).json({message:"Invalid password!!"})
    }
    const token = jwt.sign({id:existingUser._id},process.env.JWT_SECRET_KEY ,{
      expiresIn:"1d"
    })

    const options = {
      expires: new Date(
          Date.now() + 3*24*60*60*1000
      ) ,
      httpOnly: true
    }
    res.status(201).cookie('token',token,options).json({
      success: true,
      user:  existingUser,
      token: token
    });


    // res.cookie(String(existingUser._id),token,{
    //   path:'/',
    //   expires:new Date(Date.now() + 1000*60),
    //   httpOnly:true,
    //   sameSite:"lax"
    // })
    console.log('finshed login');
    // return res.status(200).json({message:"successfully logged in!",user:existingUser,token})
    
}

const verifyToken = async(req,res,next)=>{

  //using httponly cookies
  console.log('verification started');
  const token = req.cookies.token
  // console.log(cookies);
  if(!token){
    res.status(404).json({message:"No cookie header found"})
  }
  // const token = cookies.split("=")[1]
  // console.log(token);

  //verify token using headers
  // const headers = req.headers[`authorization`];
  // if(!headers){
  //   res.status(404).json({message:"No authorization header found"})
  // }
  // const token = headers.split(" ")[1];

  // if(!token){
  //   res.status(404).json({message:"No token found"})
  // }
  jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
    if(err){
      return res.status(400).json({message:'Invalid token found!'})
    }
    console.log(user.id)
    req.id = user.id
  })
  next();
}

const getUser = async(req,res,next)=>{
  console.log('get user started!');
  const userId = req.id
  console.log(userId)
  let user;
  try{
    user = await User.findById(userId,"-password")
    console.log(user);
  }catch(err){
    return new  Error(err)    
  }
  if(!user){
    return res.status(404).json({message:'user not found!'})
  }
  return res.status(200).json({user})
}

// const refreshToken = async(req,res,next)=>{
//   const cookies = req.headers.cookie;
//   const preToken = cookies.split("=")[1]
//   if(!preToken){
//     return res.status(400).json({message:"cannot find the token"})
//   }
//   jwt.verify(String(preToken),JWT_SECRET_KEY,(err,user)=>{
//     if(err){
//       console.log(err)
//       return res.status(403).json({message:"Authentication Failed"})
//     }
//     res.clearCookie(`${user.id}`)
//     res.cookies[`${user.id}`] = ""

//     const token = jwt.sign({id:user.id},JWT_SECRET_KEY,{
//       expiresIn:"35s"   
//     })
//     res.cookie(String(user.id),token,{
//       path:'/',
//       expires:new Date(Date.now() + 1000*30),
//       httpOnly:true,
//       sameSite:"lax"
//     })
//     req.id = user.id
//     next()
//   })
// }

exports.signup = signup;
exports.login = login;
exports.verifyToken =verifyToken;
exports.getUser = getUser;
// exports.refreshToken= refreshToken;
