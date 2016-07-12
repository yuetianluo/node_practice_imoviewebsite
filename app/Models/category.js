var mongoose=require('mongoose');
var CategorySchema=require('../Schemas/category.js');
var Category=mongoose.model('Category',CategorySchema);
 
module.exports=Category