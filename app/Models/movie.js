var mongoose=require('mongoose');
var MovieSchema=require('../Schemas/movie.js');
var Movie=mongoose.model('Movie',MovieSchema);
 
module.exports=Movie