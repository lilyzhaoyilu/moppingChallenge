//canvas related
var can1;
var ctx1;
var can2;
var ctx2;
var canHeight;
var canWidth;




var bgImage = new Image();
var keysDown = {};
var human;
var spot;
var data;
var corgi;






// window.onload=game

var startButton = document.getElementById("btn-start");
startButton.onclick = game;

function game() {
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameLoop();
}

function init() {
  can1 = document.getElementById("canvas1"); //front layer
  ctx1 = can1.getContext("2d");
  can2 = document.getElementById("canvas2");//background layer
  ctx2 = can2.getContext("2d");


  canWidth = can1.width;
  canHeight = can1.height;


  bgImage.src = "./src/assets/background.jpg";



  
  addEventListener("keydown",onKeyP, false);
  addEventListener("keyup", onKeyR, false);
  
  data = new dataObj();
  

  human = new humanObj();
  human.init();

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
  
  ctx2.drawImage(bgImage,0,0,canWidth,canHeight) // draw background
  ctx1.clearRect(0, 0, canWidth, canHeight);
  human.draw();
  monitorSpotAmount();
  spot.draw();
  data.draw();
  monitorCorgiAmount();
  corgi.draw();
}


