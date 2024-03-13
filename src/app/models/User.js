import bcrypt from 'bcrypt';

const { Schema, model, models } = require("mongoose");

const UserSchema = new Schema({
    name: {type: String}, 
    email:{type:String, required:true, unique: true},
    password:{type: String},
        image:{type:String},
    phone:{type:String},
    streetAddress:{type:String},
    postalCode:{type:String},
    city:{type:String},
    country:{type:String},
    admin:{type:Boolean, default:false}
        
    },
{timestamps:true});


// UserSchema.post('validate', function(user){
//     const notHashedPassword = user.password;
//     const salt = bcrypt.genSaltSync(10);
//     user.password = bcrypt.hashSync(notHashedPassword, salt);
// })

export const User = models?.User || model('User', UserSchema);