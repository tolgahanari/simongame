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
  pressColor(rnd);
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
  pressColor(pressedCode);
  //alert("correctArray[lastControlledItem]="+correctArray[lastControlledItem]+"  pressedCode="+pressedCode);
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

function pressColor(number){
  switch (number) {
    case 1:
      setTimeout(function(){$("#green").addClass("pressed");},100);
      var sound = new Audio("sounds/green.mp3");
      sound.play();
      setTimeout(function(){$("#green").removeClass("pressed");},250);
      break;
    case 2:
      setTimeout(function(){$("#red").addClass("pressed");},100);
      var sound = new Audio("sounds/red.mp3");
      sound.play();
      setTimeout(function(){$("#red").removeClass("pressed");},250);
      break;
    case 3:
      setTimeout(function(){$("#yellow").addClass("pressed");},100);
      var sound = new Audio("sounds/yellow.mp3");
      sound.play();
      setTimeout(function(){$("#yellow").removeClass("pressed");},250);
      break;
    case 4:
      setTimeout(function(){$("#blue").addClass("pressed");},100);
      var sound = new Audio("sounds/blue.mp3");
      sound.play();
      setTimeout(function(){$("#blue").removeClass("pressed");},250);
      break;
  };
}
