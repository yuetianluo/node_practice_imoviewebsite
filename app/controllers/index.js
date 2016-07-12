// whenever you change your frame work, you need to consider three
// things, 1.whethere we can still use this object
//2. do we need to exports something 3. do we need to require something
var Movie=require('../Models/movie');
var Category=require('../Models/category');
exports.index=function(req,res){
   Category
     .find({})
     .populate({path:'movies',options:{limit:5}})
     .exec(function(err,categories){
      if(err) {
         console.log(err);
      }
      res.render('homepage',{
      title:'movies homepage',
      categories: categories
    });
     });
};