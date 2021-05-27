// alert("hello");
var buttonColours = ["red","blue","green","yellow"];
//arrays for storing our clicks(colours)
var gamePattern = [];
var userClickedPattern = [];

var flag = 0;
var level = 0;

//start the game
$(document).keypress(function(){ //level 1: any key to start the game, so any other key pressed after that ,it doesn't matter cause flag = 1;
  if(!flag)
  {
    // $("#level-title").text("Level "+level);
    nextSequence();
    flag = 1;
  }
});

function  startOver(){
  level = 0;
  gamePattern = [];
  flag = 0;
}

$(".btn").click(function(){
  var userChosenColour = this.id; //or $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  //console.log(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

//to generate next sequence.
function nextSequence(){ // level 2: from here we will get the next swquence to click.
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
   console.log("success");
   if(userClickedPattern.length===gamePattern.length){
       setTimeout(function(){
         nextSequence();
       },1000);
     }
   }
  else{
  playSound("wrong");

  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);

  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
}
}

 //just to play the sound.
  function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
  }

//animation purpose
function animatePress(currentColour){
  $("#"+ currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+ currentColour).removeClass("pressed");
  },100);
}
