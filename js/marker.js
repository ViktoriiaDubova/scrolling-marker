( function () {

/// <reference path="../typings/jquery/jquery.d.ts"/>
	
var height = window.innerHeight, 
	yOffSet = window.pageYOffset,
	flag = 0,
	timerId,
	tempScrollTop = 0, 
	curentScrollTop = 0,
	highest_index = 0;

//max z-index	
var elements = document.getElementsByTagName('*');
for (var i = 0; i < elements.length - 1; i++) {
    if (parseInt(elements[i].style.zIndex) > highest_index) {
        highest_index = parseInt(elements[i].style.zIndex);
    };
};
var zIndex = highest_index + 10;

$('body').append('<div id="marker"></div>');

var marker = $('#marker');

marker.css({
				"background-color": "red",
				"position": "absolute",
				"z-index": zIndex,
				"width": "100%", 
				"height": "5px"
			});
marker.hide();

//new marker's coordinates when resize
function resazing () {
	height = window.innerHeight; 
	yOffSet = window.pageYOffset;
	marker.css("top", height + yOffSet + "px");
};

//new marker's coordinates when scroll
function scrolling (direction) {
	
	if (direction === 'down') {		
		height = window.innerHeight;
		yOffSet = window.pageYOffset;
		marker.css("top", height + yOffSet + "px");		
	} else if (direction === "up") {		
		yOffSet = window.pageYOffset;
		marker.css("top", yOffSet - 5 + "px");	
	};
};

//if resize
$(window).on('resize', function () {
	resazing();
});

//if scroll		
$(window).on('scroll', function () {
	
	marker.show();
	
	//determine the direction of the scroll	
	curentScrollTop = $(window).scrollTop();
	//scroll down
	if (tempScrollTop < curentScrollTop) {	
		if (flag === 1) {			
			clearTimeout(timerId);
			flag = 0;			
		};
				
		marker.css("top", height + yOffSet + "px");
		
		//the highest location of the marker
		var coords = marker.offset().top - window.pageYOffset;
	
		if (coords <= 5) {			
			scrolling('down');	
		} else {			
			flag = 1;
			timerId = setTimeout(function() {				
				scrolling('down');				
			}, 2000);	
		};		
	} else if (tempScrollTop > curentScrollTop) {
		//scroll up
		if (flag === 1) {			
			clearTimeout(timerId);
			flag = 0;			
		};
		
		marker.css("top", yOffSet - 5 + "px");
	
		coords = (window.pageYOffset + innerHeight) - marker.offset().top;
	
		if (coords <= 5) {			
			scrolling('up');	
		} else {			
			flag = 1;
			timerId = setTimeout(function() {				
				scrolling('up');				
			}, 2000);
		};
	};
	tempScrollTop = curentScrollTop;
});

}) ();