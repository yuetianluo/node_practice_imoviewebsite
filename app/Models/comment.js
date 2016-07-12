var mongoose=require('mongoose');
var CommentSchema=require('../Schemas/comment.js');
var Comment=mongoose.model('Comment',CommentSchema);
 
module.exports=Comment