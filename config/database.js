const mongoose=require('mongoose')

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect("mongodb+srv://Shivachauhan17:bob_bob_bob@cluster0.mz5u2w1.mongodb.net/test?retryWrites=true&w=majority",{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
    }
    catch(error){
        console.log(error)
      
    }
}


module.exports=connectDB