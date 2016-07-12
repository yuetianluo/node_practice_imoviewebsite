var User=require('../Models/user');

// sign up
exports.signup=function(req,res){
  var _user=req.body.user;  
  // here here 'new' should be in lowercase
  User.findOne({name:_user.name},function(err,user){
    if (err){
      console.log(err)
    }
    if (user){
      return res.redirect('/user/signin')
    }
    else{
      var user= new User(_user);
      user.save(function(err,user){
      if(err) {
      console.log(err);
            } 
    res.redirect('/');// you can use this way to do a test
       });
    }
  })
  
};
// userlist
exports.list=function(req,res){
  //var user=req.session.user
  //if (!user){///////////////////it is not efficient if we achieve role control by this way, we can fully use middleware
    //return res.redirect('/user/signin');//you can not forget '/' sign before user
  //}
  //if (user.role>10){
  User.fetch(function(err,users){
    if(err) {
      console.log(err);
    }
    res.render('userlist',{
    title:'user list',
    users: users
    });
   });
};
// signin
exports.signin=function(req,res){
  var _user=req.body.user;
  var name=_user.name;
  var password=_user.password;
  console.log('sucess');
  User.findOne({name:name},function(err,user){
    if(err){
      console.log(err);
          }
    if(!user){
      return res.redirect('/user/signup');// because res is not a
    }
    user.comparePassword(password,function(err,isMatch){
      if (err){
        console.log(err);
      }
      if(isMatch){
        console.log('Password is correct');
        req.session.user=user;// this is done to make sure that we can keep user registered
        return res.redirect('/');// in the later period, we will judge whether the session.use is equal to the 'user'?
      }
      else{
        return res.redirect('/user/signin');
      }
    })
    })
}

//logout
exports.logout=function(req,res){
  delete req.session.user;//The delete operator removes a property from an object.
  // because we can not use 'app' here, so we note it
  //delete app.locals.user;// here you need to remeber to delete app.local.user
  res.redirect('/');
}

exports.showSignup=function(req,res){
  res.render('signup',{
    title:'Sign up'
  })
}

exports.showSignin=function(req,res){
  res.render('signin',{
    title:'Sign in'
  })
}
//middleware
exports.signinRequired=function(req,res,next){
  var user =req.session.user;
  console.log(user);
  if(!user){
    return res.redirect('/user/signin');
  }
  next();
}
 
exports.adminRequired=function(req,res,next){
  var user=req.session.user;
  if(user.role<=10){
    return res.redirect('/user/signin');
  }
  next();
}








