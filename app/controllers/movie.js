var _=require('underscore');// when you change you folder, remember to change your routes when you use some models
var Movie=require('../Models/movie');
var Comment=require('../Models/comment');


exports.list=function(req,res){
	Movie.fetch(function(err,movies){
   	if(err) {
   		console.log(err);
   	}
   	res.render('list',{
   	title:'movies list',
   	movies: movies
    });
   });
};
exports.new=function(req,res){
   res.render('admin',{
    title: 'Enter new movie',
   	movie:{
   		title: '',
   		doctor: '',
   		country: '',
   		year: '',
   		poster: '',
   		flash: '',
   		language:'',
      summary:''
   	}
   });
};
exports.detail=function(req,res){
   var id=req.params.id;

	Movie.findById(id,function(err,movie){//here we put a movie, I guess it can output movie in the later period
       Comment
       .find({movie:id})
       .populate('from','name')//it means that it uses comment relationships to use 'from' to find the 'name' in user
       .populate('reply.from reply.to','name')
       .exec(function(err,comments){
        console.log(comments);
        if(err){
        console.log(err);
       }
    res.render('detail',{
      title:'movie detailed information '+movie.title,
      movie: movie,//here I wrong write it as 'movies'. it should be 'movie'
      comments:comments
        });
     });//because there may be more than one comment on the same movie_id, so we you comments     
   });
};

exports.save=function(req,res){
  var id=req.body.movie._id; //here the 'movie' and 'id' are depended on the input area's code
  var movieobj=req.body.movie;
  var _movie;
  if(id!=='undefined'){//here you need to give undefined a quatation
  	Movie.findById(id,function(err,movie){   
  		if(err){
  			console.log(err);
  		}
    _movie=_.extend(movie,movieobj);//!!!!!!!!!!it should be '_.extend' not '_entend' 
    _movie.save(function(err,movie){//here we defind two functions of the Movies, because we want to use
    	                            //another name,fetch and findById, but save,find,findOne method are aumatically
    	                            //gained by the model!!!!
   	if (err){
   		console.log(err);//all these these things should be in the callback function
   	}
   	res.redirect('/detail/'+movie._id);
   })
   })
  }
  else{
      _movie=new Movie({
      	doctor:movieobj.doctor,
      	title:movieobj.title,
      	country:movieobj.country,
      	language:movieobj.language,
      	year:movieobj.year,
      	poster:movieobj.poster,
      	flash:movieobj.flash,
        summary:movieobj.summary
      });
      _movie.save(function(err,movie){//?????is it that when we use the save method ,it will return the movie object
          if(err){                //Yes!!!!!!!when you use the function you will get a return
          	console.log(err);
          }
          	res.redirect('/detail/'+movie._id);//I forget '/'!!!!!!!!it shoud be in the callback function
      })
  }
}
//in update, it also gets data
exports.update=function(req,res){
    var id=req.params.id;//when we want the information posted by the form, use can use req.body.????can we use req.body.id here
    if (id){
    	Movie.findById(id,function(err,movie){//'movie' is the second parameter, and I suppose it is return by the function
    		res.render('admin',{
    			title: 'movie update page',
    			movie:movie
    		})
    	})
    }
};

//list delete
exports.del=function(req,res){
  var id=req.query.id;
  if(id){
    Movie.remove({_id:id},function(err,movie){
      if(err){
        console.log(err);
      }
      else{
        res.json({success:1});
      }
    })
  }
}