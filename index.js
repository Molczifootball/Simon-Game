var buttonColours = ["red","blue", "green","yellow"];
var gamePattern = [];
var userClickedPattern  = [];

var level = 0;
var started = false;

$(document).on("keydown",function(){
  if(!started){
    $("#level-title").html = ("Level "+level);
    nextSequence();
    started=true;
  }
});


function nextSequence(){
    userClickedPattern=[];
    console.log("nextSequence started");
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = (Math.floor(Math.random() * 4));
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3")
  audio.play();
}

function animatePress(button){
  $("#"+button).addClass("pressed")
  setTimeout(function(){
    $("#"+button).removeClass("pressed")
  },100)
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {

      console.log("wrong");

      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      //2. Call startOver() if the user gets the sequence wrong.
      startOver();
    }

}
function startOver() {
  level=0;
  gamePattern=[];
  started=false;
}
