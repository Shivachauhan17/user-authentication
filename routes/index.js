const router=require('express').Router();
const passport=require('passport');
const genPassword=require('../lib/passwordUtils').genPassword;
const User=require('../models/User');

router.post('/login',passport.authenticate('local',{successRedirect:'/login-success',failureRedirect:'/login-failure'}))

router.post('/register',(req,res,next)=>{
    console.log(req.body.password)
    const saltHash=genPassword(req.body.password);

    const salt=saltHash.salt;
    const hash=saltHash.hash;

    const newUser=new User({
        username:req.body.username,
        hash:hash,
        salt:salt
    });

    newUser.save()
        .then((user)=>{
            console.log(user)
        });
    res.redirect('/login');
});  


router.get('/',(req,res,next)=>{
    res.send('<h1>HOme</h1><a href="/register">register</a><a href="login">login</a>')
})

router.get('/register',(req,res,next)=>{
    const form ='<h1>Signup Page</h1><form method="POST" action="/register">\
    Enter Usename:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><button type="submit">submit</button></form>'
    res.send(form);
})


router.get('/login',(req,res,next)=>{
    const form='<h1>Login Page</h1><form method="POST" action="/login">\
    Enter username:<input type="text" name="username">\
    <br>Enter Password:<input type="password" name="password">\
    <br><br><input type="submit" value="submit"></form>'

    res.send(form)
})

module.exports=router;