const express = require('express')
const mongoose = require('mongoose')
const user_router = require('./routes/user-routes')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors({credentials:true,origin:"http://localhost:3001"}))
app.use(cookieParser())
app.use(express.json())
app.use('/', user_router)


mongoose.connect(process.env.MONGODB_URL).then(()=>{
    app.listen(3000)
    console.log('mongoose connected succesfully!')
}).catch((err)=>{
   console.log(err)
})