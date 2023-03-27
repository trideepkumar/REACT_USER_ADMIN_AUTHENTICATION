const express = require('express')
const mongoose = require('mongoose')
const user_router = require('./routes/user-routes')

const app = express()

 
app.use(express.json())
app.use('/', user_router)


mongoose.connect('mongodb://localhost:27017/MERN_AUTH').then(()=>{
    app.listen(3000)
    console.log('mongoose connected succesfully!')
}).catch((err)=>{
   console.log(err)
})