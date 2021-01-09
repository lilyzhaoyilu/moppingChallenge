

var humanObj = function () {
  this.x = 0;
  this.y = 0;
  this.speed = 150;
  this.rimg = new Image();
  this.limg = new Image();
  this.dizzyimg = new Image();
  this.displayRegularImg = true;
  this.score = 0;
  this.ableToMove = true;

  this.humanMotionTimer = 0;
  this.humanMotionFrame = 0;

  this.dizzyMotionTimer = 0;
  this.dizzyMotionFrame = 0;
}

humanObj.prototype.init = function(){
  this.x = canWidth/2;
  this.y = canHeight/2;
  
  this.rimg.src = './src/assets/humansprit.png';
  this.limg.src = './src/assets/humanspritr.png';
  this.dizzyimg.src = './src/assets/dizzy.png';
}

humanObj.prototype.draw = function () {
  var displayImg;
  if(this.displayRegularImg){
    displayImg = this.rimg;
  }else{
    displayImg = this.limg;
  }


  if(this.ableToMove){
  this.motion(0.02);
  this.humanMotionTimer += deltaTime;
  if(this.humanMotionTimer > 100){
    this.humanMotionFrame = ((this.humanMotionFrame + 1) % 22);
    this.humanMotionTimer %= 100;
  }
  }else{
    this.dizzyMotionTimer += (deltaTime > 50) ? 50 : deltaTime;
    // console.log("deltatime", deltaTime)
    // console.log(this.dizzyMotionTimer)
    if(this.dizzyMotionTimer > 200){
      this.dizzyMotionFrame = (this.dizzyMotionFrame + 1)% 8;
      this.dizzyMotionTimer %= 200;
    }
    
    ctx0.drawImage(this.dizzyimg,0,this.dizzyMotionFrame*550, 584,430, this.x + 30, this.y - 30, 50, 50)
  }
  
  ctx1.drawImage(displayImg,0,this.humanMotionFrame *250, 250,250, this.x , this.y , 100,100);
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
    this.displayRegularImg = true;
  }
  if ("d" in keysDown) {
    this.x = this.x > 760? this.x : this.x += this.speed * modifier;
    this.displayRegularImg = false;
  }

}
