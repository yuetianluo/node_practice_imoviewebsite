$(function(){//it is a brief version of document function....here a techonic we use is chaining, we can add several actions to one object
  $('.del').click(function(e){
  	var target=$(e.target);
  	var id=target.data('id');
  	var tr=$('.item-id-'+id);

  	$.ajax({
  		type:'DELETE',
  		url:'/admin/movie/list?id='+id//here we need to add a '=' sign behind the id
  	})
  	.done(function(results){
  		if(results.success===1){
  			if(tr.length>0){
  				tr.remove()
  			}
  		}
  	})
  })
})