//canvas related
var can0;
var ctx0;
var can1;
var ctx1;
var can2;
var ctx2;
var canHeight;
var canWidth;


////local storage

function setHighestScore(currentScore){

  if(localStorage.getItem("highestScore") !== null){
    if(currentScore > localStorage.getItem("highestScore")){
      localStorage.setItem("highestScore", currentScore)
    }
  }else{
    localStorage.setItem("highestScore", currentScore)
  }
}

////util
var deltaTime;
var keysDown = {};
// var countDown;
///
var bgImage = new Image();
var human;
var spot;
var data;
var corgi;

// var humanMotion = [];



///index logic
var title = document.getElementById("title-container")
var startButton = document.getElementById("btn-start");
var canvas = document.getElementById("canvas");
startButton.onclick = game;
var instructionButton = document.getElementById("btn-instruction");
instructionButton.onclick = showInstruction;
var instruction = document.getElementById("instruction");

var backButton = document.getElementById("btn-back");
backButton.onclick = backToMenu;

var restartButton = document.getElementById("btn-restart");
restartButton.onclick = restartGame;

var background = document.getElementById("background");
var leopic = document.getElementById("leopic");
var bubble = document.getElementById("bubble-container");
var result = document.getElementById("result");

function showInstruction(){
  instruction.classList.remove("hidden");
  startButton.classList.add("hidden");
  instructionButton.classList.add("hidden");
  leopic.classList.add("hidden");

}
function backToMenu(){
  instruction.classList.add("hidden");
  startButton.classList.remove("hidden");
  instructionButton.classList.remove("hidden");
  leopic.classList.remove("hidden");
}

// window.onload=game





///game functions



function game() {
  startButton.classList.add("hidden");
  instructionButton.classList.add("hidden");
  title.classList.add("hidden");
  
  background.classList.add("picture");
  
  init();
  lastTime = Date.now();
  deltaTime = 0;
  gameLoop();

}


function restartGame(){
  restartButton.classList.add("hidden");
  bubble.classList.add("hidden");
  init();
  lastTime = Date.now();
  deltaTime = 0;
  gameLoop();

}


function init() {
  canvas.classList.remove("hidden");
  background.classList.add("picture");
  leopic.classList.add("hidden");
  can0 = document.getElementById("canvas0");// Top layer for effects 
  ctx0 = can0.getContext("2d");
  can1 = document.getElementById("canvas1"); //front layer
  ctx1 = can1.getContext("2d");
  can2 = document.getElementById("canvas2");//background layer
  ctx2 = can2.getContext("2d");
  


  canWidth = can1.width;
  canHeight = can1.height;


  bgImage.src = "./src/assets/background.png";



  
  addEventListener("keydown",onKeyP, false);
  addEventListener("keyup", onKeyR, false);
  
  data = new dataObj();
  data.gameStart = true;
  

  human = new humanObj();
  human.init();


  spot = new spotObj();
  spot.init();

  corgi = new corgiObj();
  corgi.init();
}

function onKeyP(e) {
  // console.log(e.key);
    keysDown[e.key] = true;
}

function onKeyR(e){
  delete keysDown[e.key]
}





function displayResult(){
  var highestScore = localStorage.getItem("highestScore") ? ` <br> Huuuman's cleant ${localStorage.getItem("highestScore")} the maost!` : ``;
  
  
  if(data.score < 5){
    return `[○･｀Д´･ ○] Only ${data.score}<br>owhh you did not clean???${highestScore}`
  }else if (data.score >= 5 && data.score < 15){
    return (`${data.score} spots!<br> Do pawsome next time! ${highestScore}`)
  }else{
    return `ヾ(◍°∇°◍)ﾉﾞ<br>You cluuuned ${data.score} spots! ${highestScore}`
  }
}






function gameLoop() {
  if(data.gameOver == true){
    removeEventListener("keydown",onKeyP, false);
    removeEventListener("keyup", onKeyR, false);
    keysDown = {}
    restartButton.classList.remove("hidden");
    canvas.classList.add("hidden");
    background.classList.remove("picture");
    leopic.classList.add("leopicrestart");
    leopic.classList.remove("hidden");
    bubble.classList.remove("hidden")
    result.classList.remove("hidden");
    
    setHighestScore(data.score)
    result.innerHTML = displayResult();
    console.log("local highest score",localStorage.getItem("highestScore"));



    }else{
    window.requestAnimFrame = (function() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
          return window.setTimeout(callback, 1000 / 60);
          };
      })();
    
      /////////////////////game looping...//////////////
      requestAnimFrame(gameLoop); 
    
    
    
      var now=Date.now()
      deltaTime=now-lastTime //deltaTime is the time that renders every 2 frames
      lastTime=now
      
      if(deltaTime > 50) {
          deltaTime = 50;
      }
    
      
      ctx0.clearRect(0, 0, canWidth, canHeight);
      ctx2.drawImage(bgImage,0,0,canWidth,canHeight) // draw background
      ctx1.clearRect(0, 0, canWidth, canHeight);
      human.draw();
      monitorSpotAmount();
      spot.draw();
      data.draw();
      // data.counter();
      
      monitorCorgiAmount();
      corgi.draw();
    }
}

setInterval(countingDown, 1000);
function countingDown() {
  if (data){
  if (data.countDown <= 1) {
    clearInterval(countingDown);
    data.gameOver = true;
  } else {
    data.countDown -= 1;
  }}
}
