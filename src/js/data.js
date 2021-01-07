
var dataObj = function(){
  this.score = 0;
  this.gameStart = false;
  this.gameOver = false;
}

dataObj.prototype.scoring = function(human, spot){
  for(var i = 0; i < spot.num; i++){
    if (!spot.alive[i]) continue;
    if((human.x <= (spot.x[i] + 50)) && human.y <=(spot.y[i] + 50) && human.x + 50 > spot.x[i] && human.y + 50 > spot.y[i]){
     
      this.score++;
      spot.dead(i);
    }
  }
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

  ctx1.save();
  ctx1.fillStyle = "#fff";
  ctx1.font = "30px Verdana";
  ctx1.shadowColor = "white";
  ctx1.shadowBlur = 10;
  ctx1.fillText("Score：" + this.score, w * 0.5, h - 50);
  ctx1.restore();
}