

var spotObj = function (){
  this.alive = [];
  this.x = [];
  this.y = []; 
  this.imgs = [];
}

spotObj.prototype.num = 10;

spotObj.prototype.init = function(){
  for (var i = 0; i < this.num; i++){
    this.alive[i] = false // true means on canvas
    this.x[i] = 0;
    this.y[i] = 0;
    this.imgs[i] = new Image();
    this.imgs[i].src = `./src/assets/corgidrops/drop${Math.floor(Math.random()*8)}`
  }

}

spotObj.prototype.born = function(i) {
  this.alive[i] = true;
  this.imgs[i].src = `./src/assets/corgidrops/drop${Math.floor(Math.random()*8)}.png`
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
      ctx1.drawImage(this.imgs[i],this.x[i],this.y[i], 25,20);
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



