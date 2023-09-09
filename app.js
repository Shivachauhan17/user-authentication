const express=require('express')
const app=express()
const path=require('path')
const mongoose=require('mongoose')
const {urlencoded}=require('body-parser')
const session=require('express-session')
const MongoStore=require('connect-mongo')
const passport=require('passport')
const crypto=require('crypto')
// const routes=require('./routes')

const connectDB=require('./config/database')
// require("dotenv").config({ path: "./config/.env" });


connectDB()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
require("dotenv").config({path:path.resolve(__dirname,'./.env')})



app.use(
session({
    secret: 'keyboard cat',
    resave: false,//don't save session is unmodified
    saveUninitialized: true,//don't create session untill something is stores
    store: MongoStore.create({
      mongoUrl: process.env.DB_STRING,
      collection: 'sessions'
    })  , 
    cookie:{
      maxAge:1000*24*60*60
    }
})
)



//Setup Routes For Which The Server Is Listening
app.use("/",(req,res)=>{
    console.log(req.session)
    if(req.session.viewCount){
      req.session.viewCount=req.session.viewCount+1;
    }
    else{
      req.session.viewCount=1; 
    }
    res.send(`<h1>you have visited this page ${req.session.viewCount} time</h1>`)
});


app.use(passport.initialize());
app.use(passport.session());//has to do with express session midw and serialize and deserialize user

//Server Running
PORT=8000
app.listen(PORT, () => {
  console.log("Server is running, you better catch it!");
});


