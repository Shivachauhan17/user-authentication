const UserSchema=new  mongoose.Schema({
    username:String,
    hash:String,
    salt:String,
})

const User=conn.model('User',UserSchema)

module.exports=User