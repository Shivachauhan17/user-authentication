const router=require('express').Router();
const passport=requier('passport');
const passwordUtils=require('../lib/passwordUtils')
const User=require('../models/User')

router.post('/login',passport.authenticate('local'),(req.res,next)=>{

})