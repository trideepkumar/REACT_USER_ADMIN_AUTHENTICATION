const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const user_router = require('./routes/user-routes')
const admin_router = require('./routes/Admin-routes.js/admin-route')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({credentials:true,origin:"http://localhost:3002"}))
app.use(cookieParser())
app.use(express.json())



app.use('/', user_router)
app.use('/admin',admin_router)


mongoose.connect(process.env.MONGODB_URL).then(()=>{
    app.listen(3000)
    console.log('mongoose connected succesfully!')
}).catch((err)=>{
   console.log(err)
})