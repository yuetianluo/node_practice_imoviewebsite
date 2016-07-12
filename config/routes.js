var Index=require('../app/controllers/index')// when you change you folder, remember to change your routes when you use some models
var User=require('../app/controllers/user');//you need to understand what does '..' mean. use '..' will try to find the file up the folder that contain this file
var Movie=require('../app/controllers/movie');
var Comment=require('../app/controllers/comment');
// you need to exports and inports those modules in the app
module.exports=function(app){// we change the router, so we need to exports those functions and give it a express application as a parameter

app.use(function(req,res,next){  // this is like a middleware, and in normal case it regards req/res/next as its parameter
  var _user=req.session.user;
    app.locals.user=_user;
    next();
})

app.get('/',Index.index);


app.get('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.list);
app.get('/admin/newmovie/enter',User.signinRequired,User.adminRequired,Movie.new);
app.get('/detail/:id',Movie.detail);

app.post('/admin/enter/new',User.signinRequired,User.adminRequired,Movie.save)
//in update, it also gets data
app.get('/admin/update/:id',User.signinRequired,User.adminRequired,Movie.update);

//list delete
app.delete('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.del)
// sign up
app.post('/user/signup',User.signup);
// userlist
app.get('/admin/user/list',User.signinRequired,User.adminRequired,User.list);// actually this is like a middleware, because whenever
// signin                            // we want to visit /admin/userlist, it will execute the function User.list
app.post('/user/signin',User.signin) // so here if we want to achieve role control, we can add several functions before User.list 
app.get('/user/signin',User.showSignin);
app.get('/user/signup',User.showSignup);
//logout
app.get('/logout',User.logout)

//comment
app.post('/user/comment',User.signinRequired,Comment.save)

}




