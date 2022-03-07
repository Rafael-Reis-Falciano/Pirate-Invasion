class Cannon {
  
  constructor(x, y, width, height, angle) 
  {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.image1 = loadImage("./assets/cannonBase.png")
    this.image2 = loadImage("./assets/cannon.png")

  }

  show()
  {
    if(keyIsDown(RIGHT_ARROW) && this.angle<50)
    {
      this.angle = this.angle + 2
    }

    if(keyIsDown(LEFT_ARROW) && this.angle>-50)
    {
      this.angle = this.angle - 2
    }

    push();
    imageMode(CENTER)
    image(this.image1, 165, 140, 200, 170);
    pop();

    push();
    translate(this.x,this.y)
    rotate(this.angle)
    imageMode(CENTER);
    image(this.image2, 0, 0, this.width, this.height);
    pop();
    
  }
  
}
