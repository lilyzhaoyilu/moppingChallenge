
var corgiObj = function() {
  this.inCanvas = [];
  this.x = [];
  this.y = [];
  this.speed = [];
  this.status = "walk"
  this.img = new Image();
  this.corgiMotionTimer = 0;
  this.corgiMotionFrame = 0;
}

corgiObj.prototype.num = 2;

corgiObj.prototype.init = function(){
  for (var i = 0; i < this.num; i++){
    this.inCanvas[i] = false // true means on canvas
    this.x[i] = 0;
    this.y[i] = 0;
  }
  this.img.src = './src/assets/corginotail.png';
}

corgiObj.prototype.spawn = function(i) {
  this.inCanvas[i] = true;
  this.speed[i] = Math.random()*1;
  this.y[i] = Math.random()*560;
  this.x[i] = -10; 
}

corgiObj.prototype.respawn = function(i) {
  this.inCanvas[i] = false;
}

corgiObj.prototype.statusMonitor = function(){
  
}




corgiObj.prototype.draw = function () {
  var displayCorgiY;
  // if(this.status == "walk"){
  //   displayCorgiY = 
  // }


  this.corgiMotionTimer += deltaTime

  if(this.corgiMotionTimer > 100){
    this.corgiMotionFrame = ((this.corgiMotionFrame + 1) % 4);
    this.corgiMotionTimer %= 100;
  }

  for (var i = 0; i < this.num; i++){
    if(this.inCanvas[i]){
       (this.x[i] > 800 || this.x[i] < -10) ? this.spawn(i) : this.x[i] = (this.x[i] + this.speed[i]);
    }

    ctx1.drawImage(this.img, 102 + this.corgiMotionFrame*67,274, 50,30,this.x[i],this.y[i], 80,48);
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
