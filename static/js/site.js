// Sup y'all

var Utils = {
	get_twitter_avatar: function(screenname, cbk){
		var url = 'http://api.twitter.com/1/users/show.json?screen_name=' + screenname + '&callback=?';
		$.getJSON(url, function(data){
			 cbk && cbk(data.profile_image_url);
		});
	}
}

var Puzzler = {
	puzzle_page: function(){
		$("#puzzle .attempt").each(function(index,obj){
			console.log($(obj));
		});
	}
}

$(function(){
	if($('#puzzle').length) { Puzzler.puzzle_page();}
});