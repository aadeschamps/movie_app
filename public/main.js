
var comedies = ["Ice Age", "She's out of my league", "Shaun of the Dead", "Robin Hood Men In Tights", "Wedding Crashers", "Dodgeball"];
var dramas = ["The Godfather", "Forrest Gump", "12 Angry Men", "Titanic", "Fight Club", "Pulp Fiction"];
var action = ["Saving Private Ryan" ,"Taken", "X-men", "The Expendables", "Captain America", "Die Hard", "Die Hard 2"];
var c_length = (comedies.length * 25) + "%";
var sliders = [ $('#comedy-slider'), $('#drama-slider'), $('#action-slider')];

console.log(sliders);
$('#comedy-slider').css("width", c_length);
for (var i = 0; i < comedies.length; i++) {
	$('#comedy-slider').append("<div class='com_movies movies'></div>");
};
var c_width = (100/comedies.length) + "%";
$('.com_movies').css("width", c_width);

var d_length = (dramas.length * 25) + "%";
$('#drama-slider').css("width", d_length);
for (var i = 0; i < dramas.length; i++) {
	$('#drama-slider').append("<div class='dra_movies movies'></div>");
};
var d_width = (100/dramas.length) + "%";
$('.dra_movies').css("width", d_width);

var a_length = (action.length * 25) + "%";
$('#action-slider').css("width", a_length);
for (var i = 0; i < action.length; i++) {
	$('#action-slider').append("<div class='act_movies movies'></div>");
};
var a_width = (100/action.length) + "%";
$('.act_movies').css("width", a_width);

$('.com_movies').append('<img class="c_img img"></img>');
$('.dra_movies').append('<img class="d_img img"></img>');
$('.act_movies').append('<img class="a_img img"></img>');

// console.log($('.c_img')[1].attr("src", "www.placekitten.com/g/200/200"));
// for (var i = 0; i < comedies.length; i++) {
// 	$('.c_img')[i].attr("src", "www.placekitten.com/g/200/200");
// };

$('.c_img').each( function(index, item){
	getImgUrl(comedies[index], item);
});
$('.d_img').each( function(index, item){
	getImgUrl(dramas[index], item);
});
$('.a_img').each( function(index, item){
	getImgUrl(action[index], item);
});




function getImgUrl(movie, item){
	var urled = encodeURI(movie);
	var url = " http://omdbapi.com/?t=" + urled;
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url);
	xhr.addEventListener('load',function(e){
		var d = xhr.responseText;
		var parsed = JSON.parse(d);
		$(item).attr('src', parsed.Poster)
	});
	xhr.send();
};

var mouse = [false, false, false];
var curr_x = [0, 0, 0];
$(".slider").each( function(index, item){
	$( this ).mousedown(function(event){
		var offset = $( this ).parent().offset();
		console.log(this.offsetLeft);
		console.log(event.pageX - offset.left);
		mouse[index] = true;
		curr_x[index] = (event.pageX - offset.left);
		console.log(curr_x);
		// console.log(curr_x);
	});

	$( this ).mouseup(function(){
		mouse[index] = false;
		// var current = window.parseFloat(proj_cont.style.marginLeft.replace("%",""));
		// if( current < -(curr_proj * 100) ){
		// 	if( current < -(curr_proj * 100 + 25) ){
		// 		curr_proj++;
		// 	}
		// 	var new_pos = -(curr_proj * 100) + "%";
		// 	$("#proj_cont").animate({"margin-left": new_pos}, 200);	
		// }else{
		// 	if( current > -( (curr_proj - 1) * 100 + 75) ){
		// 		if(curr_proj > 0){curr_proj--;}
		// 	}
		// 	var new_pos = -(curr_proj * 100) + "%";
		// 	$("#proj_cont").animate({"margin-left": new_pos}, 200);
		// }
	});
	$( this ).mousemove(function(e){
		if(mouse[index]){
			var abs_pos = e.clientX / window.innerWidth * 100;
			var change = abs_pos - curr_x;
			var abs_current = proj_cont.style.marginLeft.replace("%", "");
			curr_x = e.clientX / window.innerWidth * 100;
			var current = window.parseFloat(abs_current);
			if (change < 0){
				if( (-current) < proj_width - 100){
					if(current + change <= -(proj_width - 100)){
						console.log("hello");
						change = -(proj_width - 100) - current;
					}
					move(change);
				}	
			}else if(change > 0){
				if(current < 0){
					if(current + change >= 0){
						change = -(current);
					}
					move(change);
				}
			}
		}
	});
});
