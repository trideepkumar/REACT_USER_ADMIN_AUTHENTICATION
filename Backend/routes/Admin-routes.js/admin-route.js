const express = require('express')
const router = express.Router()
const {login,signup,verifyToken,getUsers,deleteUser,getEdit,editUser} = require('../../controllers/admin-controllers.js/controller')


router.post('/signup',signup)
router.post('/login',login)
router.get('/user',verifyToken,getUsers)
router.patch('/delete',deleteUser)
router.get('/edit/:id',getEdit)
router.put('/edit-user/:id',editUser)


module.exports = router;