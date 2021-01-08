//canvas related
var can0;
var ctx0;
var can1;
var ctx1;
var can2;
var ctx2;
var canHeight;
var canWidth;


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

function showInstruction(){
  instruction.classList.remove("hidden");
  startButton.classList.add("hidden");
  instructionButton.classList.add("hidden");
}
function backToMenu(){
  instruction.classList.add("hidden");
  startButton.classList.remove("hidden");
  instructionButton.classList.remove("hidden");
}

// window.onload=game





///game functions



function game() {
  startButton.classList.add("hidden");
  instructionButton.classList.add("hidden");
  title.classList.add("hidden");
  canvas.classList.remove("hidden");

  init();
  lastTime = Date.now();
  deltaTime = 0;
  gameLoop();

}


function restartGame(){
  restartButton.classList.add("hidden");
  init();
  lastTime = Date.now();
  deltaTime = 0;
  gameLoop();

}


function init() {
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

  // for (var i = 0; i <23; i++){
  //   humanMotion[i] = new Image();
  //   humanMotion[i].src = `./src/assets/human${i}.png`
  // }

  spot = new spotObj();
  spot.init();

  corgi = new corgiObj();
  corgi.init();
}

function onKeyP(e) {
    keysDown[e.key] = true;
}

function onKeyR(e){
  delete keysDown[e.key]
}












function gameLoop() {
  window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
      function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
        return window.setTimeout(callback, 1000 / 60);
      };
  })();


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
 

  if(data.gameOver == true){
    removeEventListener("keydown",onKeyP, false);
    removeEventListener("keyup", onKeyR, false);
    restartButton.classList.remove("hidden");
    }
}

setInterval(countingDown, 1000);
function countingDown() {
  if (data){
  if (data.countDown === 0) {
    clearInterval(countingDown);
    data.gameOver = true;
  } else {
    data.countDown -= 1;
  }}
}
