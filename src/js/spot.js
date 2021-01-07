

var spotObj = function (){
  this.alive = [];
  this.x = [];
  this.y = []; 
  this.img = new Image();
}

spotObj.prototype.num = 10;

spotObj.prototype.init = function(){
  for (var i = 0; i < this.num; i++){
    this.alive[i] = false // true means on canvas
    this.x[i] = 0;
    this.y[i] = 0;
  }
  this.img.src = './src/assets/spot.png'
}

spotObj.prototype.born = function(i) {
  this.alive[i] = true;
  this.x[i] = Math.random()*750 + 20;
  this.y[i] = Math.random()*550 + 20;
}

spotObj.prototype.dead = function(i) {
  this.alive[i] = false;
}

spotObj.prototype.draw = function () {
  for (var i = 0; i < this.num; i++){
    // console.log("spot",this)
    if(this.alive[i]){
      ctx1.drawImage(this.img,this.x[i],this.y[i]);
    }
  }

}



//////////////////class methods 

function generateSpot () {
  for (var i = 0; i < spot.num; i++) {
    if(!spot.alive[i] ) {
        spot.born(i);
        return;
    }
}}

function monitorSpotAmount() {
  var currentSpotAmount = 0;
 
  for (var i = 0; i < spot.num; i++){
    if (spot.alive[i]) currentSpotAmount++;
  }
  if (currentSpotAmount < spot.num){
    generateSpot();
    return;
  }
}



