const express=require('express')

app=express();
app.use(middleware1)//now middlwware1 becomes a global middleware and executes on every route

function middleware1(req,res,next){
    console.log('middleware 1')
    const errorObj= new Error('The system has been cracked');
    req.status=100;//created variable that is attached to req object
    next(errorObj);//pass the error object to next callback
}


function errorHandler(err,req,res,next){
    if(err){
        req.status=400
        res.send(`<h1>hey there there is an error please try again ${req.status}</h1>`)
    }
}
app.use(errorHandler)
app.get('/',(requestObj,responseObj,next)=>{
    responseObj.send('<h1>Hello world</h1>')
})
app.listen(8000);