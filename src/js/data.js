
var dataObj = function(){
  this.score = 0;
  this.gameStart = false;
  this.gameOver = false;
  this.countDown = 10; //change to 30 later
}

dataObj.prototype.scoring = function(human, spot){
  if(this.gameStart && !this.gameOver){
  for(var i = 0; i < spot.num; i++){
    if (!spot.alive[i]) continue;
    if((human.x <= (spot.x[i] + 100)) && human.y <=(spot.y[i] + 100) && human.x + 100 > spot.x[i] && human.y + 100 > spot.y[i]){
     
      this.score++;
      spot.dead(i);
      this.countDown = this.countDown + 0.1;
    }
  }}
}

dataObj.prototype.checkcollision = function(human, corgi){
  // setTimeout(()=>{
    // if(!corgi.inCanvas[i]) continue;
    for(var i = 0; i < corgi.num; i++){
    if((human.x <= (corgi.x[i] + 50)) && (human.y <=(corgi.y[i] + 50)) && (human.x + 50 > corgi.x[i]) && human.y + 50 > corgi.y[i]){
      human.ableToMove = false;
      setTimeout(()=>{
      human.ableToMove = true;
      }, 2000)
    }}
}

dataObj.prototype.draw = function(){
  this.scoring(human,spot);
  this.checkcollision(human,corgi);
  
  var w = can1.width;
  var h = can1.height;
  
  if(this.gameStart && !this.gameOver){
  ctx1.save();
  ctx1.fillStyle = "#fff";
  ctx1.font = "40px 'Short Stack', cursive";
  ctx1.shadowColor = "white";
  ctx1.shadowBlur = 10;
  var time = parseFloat(this.countDown).toFixed(0);
  ctx1.fillText("Score: " + this.score, w * 0.1, 50);
  ctx1.fillText("Time Left: " + time, w * 0.6, 50);
  ctx1.restore();}
  // }else if(this.gameOver){
  //   ctx1.save();
  //   ctx1.fillStyle = "rgba(255,255,255," + 1 + ")";
  //   ctx1.font = "30px Verdana";
  //   ctx1.shadowColor = "white";
  //   ctx1.shadowBlur = 10;
  //   // ctx1.fillText("game over",w * 0.5, h *0.5);
  //   ctx1.restore()
  // }
}
