
var corgiObj = function() {
  this.inCanvas = [];
  this.x = [];
  this.y = [];
  this.speed = [];
  this.status = [];
  this.img = new Image();
  this.corgiMotionTimer = [];
  this.corgiMotionFrame = [];
  // this.corgiSpriteY = [];
  // this.corgiFrameFactor = [];
  this.memo = {
    "walk": {"displayCorgiY": 274, "corgiFrameFactor": 4},
    "sniff": {"displayCorgiY": 474, "corgiFrameFactor": 7},
  }
}

corgiObj.prototype.num = 2;

corgiObj.prototype.init = function(){
  for (var i = 0; i < this.num; i++){
    this.inCanvas[i] = false // true means on canvas
    this.x[i] = 0;
    this.y[i] = 0;
    this.status[i] = "walk"
    this.corgiMotionTimer[i] = 0;
    this.corgiMotionFrame[i] = 0;
  }
  this.img.src = './src/assets/corginotail.png';
}

corgiObj.prototype.spawn = function(i) {
  this.inCanvas[i] = true;
  if (this.status[i] == "walk"){
    this.status[i] = "sniff"
  }else if (this.status[i] == "sniff"){
    this.status[i] = "walk"
  }
  this.speed[i] = Math.random()*1;
  this.y[i] = Math.random()*560;
  this.x[i] = -10; 
}



corgiObj.prototype.respawn = function(i) {
  this.inCanvas[i] = false;
}


corgiObj.prototype.draw = function () {
  
  
  
 

  for (var i = 0; i < this.num; i++){
    this.corgiMotionTimer[i] += deltaTime

    // if(this.status[i] == "walk"){
    //   displayCorgiY = 274;
    //   corgiFrameFactor = 4;
    // }else if(this.status[i] == "sniff"){
    //   displayCorgiY = 474;
    //   corgiFrameFactor = 7;
    // }

    if(this.corgiMotionTimer[i] > 100){
      // console.log("a", this.status[i], this.memo[this.status[i]].corgiFrameFactor);
      this.corgiMotionFrame[i] = ((this.corgiMotionFrame[i] + 1) % this.memo[this.status[i]].corgiFrameFactor);
      this.corgiMotionTimer[i] %= 100;
    }
      
    if(this.inCanvas[i]){
       (this.x[i] > 800 || this.x[i] < -10) ? this.spawn(i) : this.x[i] = (this.x[i] + this.speed[i]);
    }

    

    /// drawImage(source, source's x, source's y, source size on x, source size on y, canvas x, canvas y, canvas' size x , cnavas size y)
    // console.log(this.img, this.corgiMotionFrame[i], displayCorgiY)
    ctx1.drawImage(this.img, 102 + this.corgiMotionFrame[i] * 64, this.memo[this.status[i]].displayCorgiY, 50 ,40,this.x[i],this.y[i], 80,54);
  }
}


function generateCorgi () {
  for (var i = 0; i < corgi.num; i++) {
    if(!corgi.inCanvas[i] ) {
        corgi.spawn(i);
        return;
    }
}}

function monitorCorgiAmount() {
  var currentCorgiAmount = 0;
 
  for (var i = 0; i < corgi.num; i++){
    if (corgi.inCanvas[i]) currentCorgiAmount++;
  }
  if (currentCorgiAmount < corgi.num){
    generateCorgi();
    return;
  }
}
