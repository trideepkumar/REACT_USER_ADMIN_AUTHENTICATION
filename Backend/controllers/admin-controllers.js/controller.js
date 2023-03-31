const express =require('express')
const  User = require('../../model/user')
const Admin = require('../../model/admin')
const jwt = require('jsonwebtoken')



const login = async(req,res,next)=>{
    const email = req.body.email;
    console.log(email)
    let existingUser;
    try{
      console.log('loginworks')
        existingUser = await Admin.find({email:email})
        console.log(existingUser);
    }catch(err){
        console.log(err)
    }
    if(!existingUser){
      return res.status(400).json({message:"user not registered! SignUp please!"})
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
}

const signup = async (req, res, next) => {
    const {email,password} = req.body
    //for existing user validation (user EXIST OR NOT )
    let existingUser;
    try{
        existingUser = await Admin.findOne({email:email})
    }catch(err){
       console.log(err)
    }
    if(existingUser){
        return (
        res.status(400).json({message:'User already exist! LOGIN Instead'})
        )
    }
   
    const admin = new Admin({
    email:email,
    password:password
  });
  try {
    await admin.save();
    console.log('hello')
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({message:admin})
}

const verifyToken = async(req,res,next)=>{
    console.log('verification started');
    const token = req.cookies.token
    if(!token){
      res.status(404).json({message:"No cookie header found"})
    }
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
      if(err){
        return res.status(400).json({message:'Invalid token found!'})
      }
      console.log(user.id)
      req.id = user.id
    })
    next();
  }


const getUsers = async (req,res,next)=>{
    console.log("user details");
    try{
        const users = await User.find({isDeleted:false},"-password")
        console.log(users);
        return res.status(200).json({users})
    }catch(error){
          console.log(error);
          return res.status(404).json({message:"No data found"})
        }
    }

const deleteUser = async(req,res,next)=>{
    const {id} = req.body
    console.log(id);
    try{
      const user =   await User.findOne({_id:id})
      console.log(user);
        await User.findOneAndUpdate({_id:id},{$set:{isDeleted:true}})
        return res.status(200).json({message:"Deleted!"})
    }
    catch(error){
        console.log(error);
    }
}  

const getEdit = async (req, res) => {
    console.log("get edit page");
    const id = req.params.id.trim();
        console.log(id);
    try {
      const user = await User.findOne({ _id: id }, "-password");
      console.log(user);
      res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      res.status(404);
    }
  };

const editUser = async(req,res)=>{
    console.log("editing user put");
    const id = req.params.id.trim();
    console.log(id);
    
    console.log(req.body.name);
    console.log(req.body.email);
    try{
        await User.findOneAndUpdate({_id: id}, {$set: {name: req.body.name, email: req.body.email}})
        return res.status(200).json({message:"user updated successfully!"})
    }
    catch(error){
        console.log(error);
        res.status(404)
    }
}


exports.login =login
exports.signup = signup
exports.verifyToken = verifyToken
exports.getUsers = getUsers
exports.deleteUser = deleteUser
exports.getEdit = getEdit
exports.editUser = editUser