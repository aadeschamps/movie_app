
var comedies = ["Ice Age", "She's out of my league", "Shaun of the Dead", "Robin Hood Men In Tights", "Wedding Crashers", "Dodgeball"];
var dramas = ["The Godfather", "Forrest Gump", "12 Angry Men", "Titanic", "Fight Club", "Pulp Fiction"];
var action = ["Saving Private Ryan" ,"Taken", "X-men", "The Expendables", "Die another day", "Die Hard", "Die Hard 2"];
var c_length = (comedies.length * 25) + "%";

// sets the length of each slider depending on how many movies are
// in them and appends those movies to till the exact amount of slider
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


// loops through all of the movies and calls the getImgUrl
$('.c_img').each( function(index, item){
	getImgUrl(comedies[index], item);
});
$('.d_img').each( function(index, item){
	getImgUrl(dramas[index], item);
});
$('.a_img').each( function(index, item){
	getImgUrl(action[index], item);
});

// takes in movie title and item and queries OMDB,
// gets the poster img url and sets the img src to it
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
}

// takes in movie title and gets all information for it
// populates the pop-up divs information with it
function getAll(movie){
	var urled = encodeURI(movie);
	var url = " http://omdbapi.com/?t=" + urled;
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url);
	xhr.addEventListener('load',function(e){
		var d = xhr.responseText;
		var parsed = JSON.parse(d);
		$('#big_img').attr('src', parsed.Poster);
		$('#title').text(parsed.Title);
		$('#actors').text(parsed.Actors);
		$('#rating').text("Rating: " + parsed.Rated);
		$('#desc').text("Plot: " + parsed.Plot);
	});
	xhr.send();
}


// controlls mouse clicks and current x position of
// each row
var mouse = [false, false, false];
var curr_x = [0, 0, 0];

// loop through each slider
$(".slider").each( function(index, item){
	// when mouse click down, set mouse to true
	// of the current slider, and false when mouse down
	$( this ).mousedown(function(event){
		var offset = $( this ).parent().offset();
		mouse[index] = true;
		curr_x[index] = (event.pageX - offset.left);
	});

	$( this ).mouseup(function(){
		mouse[index] = false;
	});

	// if the mouse is clicked, change the margin left
	// property to simulate sliding of slider
	$( this ).mousemove(function(e){
		if(mouse[index]){
			// gets the current position of mouse relative to div
			var offset = $( this ).parent().offset();
			var new_pos = e.pageX - offset.left;
			// calculate the change since the last move
			var change = new_pos - curr_x[index];
			// resets the current mouse pos to new mouse pos
			curr_x[index] = new_pos;
			// gets the current margin-left
			var strMarginLeft = $( this ).css("margin-left").replace("px","");
			var marginLeft = window.parseInt(strMarginLeft);
			var move = marginLeft + change;
			// tests the left bounds to deny sliding past
			if(move > 0){
				move = 0;
			}
			var str_movie_width = $( this ).first().css("width").replace("px","");
			var movie_width = window.parseInt(str_movie_width) / $( this ).children().length;
			var left_barrier = ($( this ).children().length * movie_width) - (movie_width * 4);
			// tests the right boundaries of slider
			if( move < -left_barrier){
				move = -left_barrier;
			}
			var str_move = move + "px";
			// console.log(str_move);
			// sets the new margin-left property to simulate sliding
			$( this ).css("margin-left", str_move);
		}
	});
});

// brings up pop-up when a movie is clicked
$(".com_movies").dblclick(function(e){
	$("#pop-up").removeClass("pop-out");
	$('#darken').removeClass("pop-out");
	$('#pop-up').css("z-index","5");
	$("#pop-up").addClass("pop-in");
	$('#darken').css("z-index", "4");
	$('#darken').addClass("pop-in");
	var index = $( this ).index();
	getAll(comedies[index]);
});
$(".dra_movies").dblclick(function(e){
	$("#pop-up").removeClass("pop-out");
	$('#darken').removeClass("pop-out");
	$('#pop-up').css("z-index","5");
	$("#pop-up").addClass("pop-in");
	$('#darken').css("z-index", "4");
	$('#darken').addClass("pop-in");
	var index = $( this ).index();
	getAll(dramas[index]);
});
$(".act_movies").dblclick(function(e){
	$("#pop-up").removeClass("pop-out");
	$('#darken').removeClass("pop-out");
	$('#pop-up').css("z-index","5");
	$("#pop-up").addClass("pop-in");
	$('#darken').css("z-index", "4");
	$('#darken').addClass("pop-in");
	var index = $( this ).index();
	getAll(action[index]);
});

// hides pop-up when anything outside the popup is clicked
$('#darken').click(function(e){
	$("#pop-up").removeClass("pop-in");
	$('#darken').removeClass("pop-in");
	$("#pop-up").addClass("pop-out");
	$('#darken').addClass("pop-out");
	window.setTimeout(function(){
		$('#darken').css("z-index", "1");
		$('#pop-up').css("z-index","2");
	},1000);
});