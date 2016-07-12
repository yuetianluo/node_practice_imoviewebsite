var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;// what does that mean

var CommentSchema=new mongoose.Schema({
	movie:{
		type:ObjectId, ref:'Movie'
	},
	from:{type:ObjectId,ref:'User'},
	reply:[{// reply should be a array, and it includes who reply and reply who and content
       to:{type:ObjectId,ref:'User'},
       from:{type:ObjectId,ref:'User'},
       content:String
	}],
	content:String,
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

CommentSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt=this.meta.updateAt=Date.now()
	}
	else{
		this.meta.updateAt=Date.now()
	}
	next()
})

CommentSchema.statics={
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
}
module.exports=CommentSchema;
