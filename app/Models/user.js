var mongoose=require('mongoose');
var UserSchema=require('../Schemas/user.js');
var User=mongoose.model('User',UserSchema);
 
module.exports=User