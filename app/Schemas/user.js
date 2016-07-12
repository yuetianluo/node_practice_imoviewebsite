var mongoose=require('mongoose');
var bcrypt=require('bcrypt');

var UserSchema=new mongoose.Schema({
	name:{
		unique:true,	
		type:String
	},
	password:String,
	//0: normal user
	//1:verified user
	//2:professonal user
	//>10 :admin
	//>50: super admin
	role:{
		type:Number,
		default:0
	},//admin,high admin, but here we use number to differenticate dusers
	meta:{
		createAt:{
			type: Date,
			default: Date.now()
		},
		updateAt:{
			type:Date,
			default: Date.now()
		}
	}
})

UserSchema.pre('save',function(next){
	var user=this; //here user is this account user
	if(this.isNew){
		this.meta.createAt=this.meta.updateAt=Date.now()
	}
	else{
		this.meta.updateAt=Date.now()
	}
    bcrypt.genSalt(10,function(err,salt){
    	if(err) return next(err);
        bcrypt.hash(user.password,salt,function(err,hash){
           if (err) return next(err);
           user.password=hash;
           next();
        });
    });
});

UserSchema.statics={
  fetch: function(cb){
  	return this
  	  .find({})
  	  .sort('meta.updateAt')
  	  .exec(cb)
  },
  findById: function(id,cb){//!!!!!!!!here I forget to add id as a parameter!!!!!!!!!!!!!! 
  	return this
  	  .findOne({_id:id})
  	  .exec(cb)
  }
}//if it is a statics method, it can be used in models.but if it is a object method, only the object of model can use it

UserSchema.methods={
	comparePassword:function(_password,cb){
		bcrypt.compare(_password,this.password,function(err,isMatch){
			if (err) return cb(err)
			cb(null,isMatch);
		})
	}
}









module.exports=UserSchema;