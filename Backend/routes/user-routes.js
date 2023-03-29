const express = require('express');
const router =  express.Router();
const { signup,login,verifyToken ,getUser} = require('../controllers/user-controllers');


router.post('/signup',signup)
router.post('/login',login)
router.get('/user',verifyToken,getUser)
// router.get('/refresh',refreshToken,verifyToken,getUser)
//verify token routes

module.exports = router;