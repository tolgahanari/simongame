var correctArray = [];
var level;
var userArray = [];
var lastControlledItem;

$("body").keydown(function(){
  var title = $("#level-title").text();
  if ( title.substring(0,5)!="Level") {
    level=1;
    correctArray=[];
    startGame(level);
  }
});

function startGame(level){
  lastControlledItem=0;
  $("#level-title").text("Level "+level);
  var rnd = Math.floor(Math.random()*4)+1;
  correctArray.push(rnd);
  soundAndAnimation(rnd);
  $(".btn").on("click",function(event){
    userInput(event);
  });
}

function userInput(buttonPressed){
  var pressed = buttonPressed.target.id;
  var pressedCode;
  switch (pressed) {
    case "green":
      pressedCode = 1;
      break;
    case "red":
      pressedCode = 2;
      break;
    case "yellow":
      pressedCode = 3;
      break;
    case "blue":
      pressedCode = 4;
      break;
  }
  soundAndAnimation(pressedCode);
  if (correctArray[lastControlledItem] === pressedCode) {
    lastControlledItem++;
    if (correctArray.length === lastControlledItem) {
      $(".btn").off("click");
      level++;
      setTimeout(function(){startGame(level);},400);
    }
  }
  else {
    gameOver();
  }
}

function gameOver(){
  level=1;
  correctArray=[];
  var sound = new Audio("sounds/wrong.mp3");
  sound.play();
  $("#level-title").text("Game Over, Press Any Key to Restart");
  $(".btn").off("click");
  $("body").addClass("game-over");
  setTimeout(function(){$("body").removeClass("game-over");},300);
}

function soundAndAnimation(number){
  var colors = ["green","red","yellow","blue"];
  var color = colors[number-1];
  setTimeout(function(){$("#"+color).addClass("pressed");},100);
  var sound = new Audio("sounds/"+color+".mp3");
  sound.play();
  setTimeout(function(){$("#"+color).removeClass("pressed");},250);
}
