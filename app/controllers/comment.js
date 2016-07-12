var Comment=require('../Models/comment');

exports.save=function(req,res){
	var _comment=req.body.comment;
	var movieId=_comment.movie;//after that we need to remeber that  when post, it should be movie
    // because we just deal with the comment, but we do not deal with reply, and their return to the same page,so we need identify their difference 
	
    if(_comment.cid){
    	Comment.findbyId(_comment.cid,function(err,comment){
    		var reply={
    			from:_comment.from,
    			to:_comment.tid,
    			content:_comment.content
    		}
    		comment.reply.push(reply)
    		comment.save(function(err,comment){
    			if(err){
    				console.log(err);
    			}
    			res.redirect('/movie/'+movieId)
    		})
    	})
    }
    else{
    	var comment=new Comment(_comment);


	comment.save(function(err,comment){
		if(err){
			console.log(err);
		}
		res.redirect('/detail/'+movieId);
	})
    }
//if it is a reply, we can not new Comment
}