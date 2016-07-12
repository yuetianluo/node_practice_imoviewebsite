$(function() {
  $('.comment').click(function(e) {/*
  $(function(){//it is a brief version of document function....here a techonic we use is chaining, we can add several actions to one object
  $('.comment').click(function(e){
  	var target=$(this);//?????????????here why we need to change to this, not e.target
  	var toId=target.data('tid');//because in reply we want to make that information achieved dymaniclly
  	var commentId=target.data('cid');
  	if($('#toId').length>0){
  		$('#toId').val(toId)
  	}
  	else{
  		$('<input>').attr({
    	type:'hidden',
    	id:'toId',
    	name:'comment[tid]',
    	value:toId
    }).appendTo('#commentForm')//it is a hidden area
  	}
    if($('#commentId').length>0){
  		$('#commentId').val(commentId)
  	}
  	else{
  		$('<input>').attr({
    	type:'hidden',
    	id:'commentId',
    	name:'comment[cid]',
    	value:commentId
    }).appendTo('#commentForm')
  }
})
})
*/

    var target = $(this)
    var toId = target.data('tid')
    var commentId = target.data('cid')

    if ($('#toId').length > 0) {
      $('#toId').val(toId)
    }
    else {
      $('<input>').attr({
        type: 'hidden',
        id: 'toId',
        name: 'comment[tid]',
        value: toId
      }).appendTo('#commentForm')
    }

    if ($('#commentId').length > 0) {
      $('#commentId').val(commentId)
    }
    else {
      $('<input>').attr({
        type: 'hidden',
        id: 'commentId',
        name: 'comment[cid]',
        value: commentId
      }).appendTo('#commentForm')
    }
  })
})