

var humanObj = function () {
  this.x = 0;
  this.y = 0;
  this.speed = 200;
  this.img = new Image();
  this.score = 0;
  this.ableToMove = true;
}

humanObj.prototype.init = function(){
  // console.log("human init");
  this.x = canWidth/2;
  this.y = canHeight/2;
  // console.log("human init w/h", canWidth, canHeight);
  this.img.src = './src/assets/human1.png';
}

humanObj.prototype.draw = function () {
  if(this.ableToMove){
  this.motion(0.02);
  }
  ctx1.drawImage(this.img,this.x,this.y, 100,100);
}

humanObj.prototype.motion = function(modifier){
  if ("w" in keysDown) {
    this.y = this.y < 5 ? this.y : this.y -= this.speed * modifier; //boarder limitation
  }
  if ("s" in keysDown) {
    this.y = this.y > 550 ? this.y : this.y += this.speed * modifier;
  }
  if ("a" in keysDown) {
    this.x = this.x < 5? this.x : this.x -= this.speed * modifier;
  }
  if ("d" in keysDown) {
    this.x = this.x > 760? this.x : this.x += this.speed * modifier;
  }

}
