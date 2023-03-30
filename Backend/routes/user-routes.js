const express = require('express');
const router =  express.Router();
const { signup,login,verifyToken ,getUser,logout,updateProfile} = require('../controllers/user-controllers');
const userMiddleware = require('../middlewares/userMiddleware')

router.get('/',(req,res)=>{
    res.send('hello')
})
router.post('/signup',signup)
router.post('/login',login)
router.get('/user',verifyToken,getUser)
// router.get('/refresh',refreshToken,verifyToken,getUser)
router.post('/logout',verifyToken,logout)
router.patch('/update',verifyToken, userMiddleware.upload.single('image'),updateProfile)

module.exports = router;