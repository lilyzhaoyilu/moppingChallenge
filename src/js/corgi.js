
var corgiObj = function() {
  this.inCanvas = [];
  this.x = [];
  this.y = [];
  this.speed = [];
  this.img = new Image();
}

corgiObj.prototype.num = 2;

corgiObj.prototype.init = function(){
  // console.log("corgi")
  for (var i = 0; i < this.num; i++){
    this.inCanvas[i] = false // true means on canvas
    this.x[i] = 0;
    this.y[i] = 0;
  }
  this.img.src = './src/assets/corgi.png';
}

corgiObj.prototype.spawn = function(i) {
  this.inCanvas[i] = true;
  this.speed[i] = Math.random() ;
  this.x[i] = Math.random()*300 + 100;
  this.y[i] = Math.random()*450 + 100;
}

corgiObj.prototype.respawn = function(i) {
  this.inCanvas[i] = false;
}



corgiObj.prototype.draw = function () {
  for (var i = 0; i < this.num; i++){
    // console.log("corgi",this)
    if(this.inCanvas[i]){
      this.x[i] = (this.x[i] > 530 || this.x[i] < -10) ? 0 : (this.x[i] + this.speed[i]);
      // console.log(this.x[i]);
      this.y[i] = (this.y[i] > 530 || this.y[i] < -10) ? 0 : (this.y[i] + this.speed[i]);
      // console.log("corgi", this)
      ctx1.drawImage(this.img,this.x[i],this.y[i], 50,50);
    }
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
