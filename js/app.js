// We are creating a game to get the number of correct clicks of wrong clicks by the user
// on a moving object.

var totalTime = 20;
var width = $("#gameboard").width() - 80 - 5;
var height = $("#gameboard").height() - 80 - 5;
var instructions = $("#instructions");
var cover = $("#cover");
var target = $("#target");
var timeHolder = $("#timecount");
var start = $("#start");
var correct = $("#correct-count");
var wrong = $("#wrong-count");

timeHolder.text(totalTime);

// Keep game time:
var timer = function() {
	correct.text("0");
	wrong.text("0");
	var time = totalTime*1000;
	var remainingTime = totalTime;
	var countTime = setInterval(function(){
		remainingTime -= 1;
		timeHolder.text(remainingTime);
	},1000);
	
	setTimeout(function(){
		clearInterval(countTime);
		instructions.html("<b>Game Over</b><br><br>Click Start button to play again.");
		start.text("Restart Game");
		cover.fadeIn();
	},(time+500));
}

var generateTarget = function() {
	target.hide();
	// generate color
	var randomColor = Math.round(Math.random());
	if(randomColor == 1) {
		target.removeClass("wrong");
		target.addClass("correct");
	} else {
		target.removeClass("correct");
		target.addClass("wrong");
	}
	// generate position
	var newHeight = parseInt(Math.random() * height);
	var newWidth = parseInt(Math.random() * width);
	target.css({"top": newHeight, "left": newWidth});
	target.show();
}

var addScore = function() {
	if($(this).hasClass("correct")) {
		var score = parseInt(correct.text());
		correct.text(score+1);
	} else {
		var score = parseInt(wrong.text());
		wrong.text(score+1);
	}
}

var generateTargetAfterDelay = setInterval(generateTarget,1000);

target.on("click",addScore);

// When start button is clicked
start.on("click", function(){
	// show totatTime
	timeHolder.text(totalTime);
	// start counting
	timer();
	// hide the cover
	cover.fadeOut();
	// generate target
	generateTarget();
});			