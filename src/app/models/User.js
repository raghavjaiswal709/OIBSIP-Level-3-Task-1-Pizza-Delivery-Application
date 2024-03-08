import bcrypt from 'bcrypt';

const { Schema, model, models } = require("mongoose");

const UserSchema = new Schema({
    name: {type: String},
    email:{type:String, required:true, unique: true},
    password:{
        type: String,
        required: true,
        validate: pass=>{
            if(!pass.length || pass.length<5){
                new Error('password must be of atleast 5 Characters');
                
            }
        }
        
    }
},{timestamps:true});


UserSchema.post('validate', function(user){
    const notHashedPassword = user.password;
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(notHashedPassword, salt);
})

export const User = models?.User || model('User', UserSchema);