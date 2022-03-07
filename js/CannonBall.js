class CannonBall
{
    constructor(x,y)
    {
        var options = {
            isStatic: true
        }
        this.r = 30;
        this.body = Bodies.circle(x,y,this.r,options);
        this.image = loadImage("assets/cannonball.png");
        this.trajetoria = []
        this.agua_animacao = [this.image];
        World.add(world, this.body);
        this.isSink = false;
        this.speed = 0.05;
    }

    animacao()
    {
      this.speed += 0.05;
 
    }

    remove(indice)
    {
        Matter.Body.setVelocity(this.body, {x:0, y:0});

        this.agua_animacao = agua;
        this.isSink = true;
        this.r = 100

        setTimeout(() => {
            Matter.World.remove(world,this.body);
            delete bolas[indice];
        }, 1000);
    }
    
    display()
    {
        var pos = this.body.position;
        var angulo = this.body.angle;
        var indice = floor(this.speed % this.agua_animacao.length);

        push();
        imageMode(CENTER);
        image(this.agua_animacao[indice],pos.x,pos.y,this.r,this.r);
        translate(pos.x, pos.y);
        rotate(angulo)
        pop();

        if(this.body.velocity.x>0 && pos.x>250 && !this.isSink)
        {
            var bolaPosicao = [pos.x,pos.y];
            this.trajetoria.push(bolaPosicao);
        }
        for(var i = 0; i < this.trajetoria.length; i++)
        {
            image(this.image, this.trajetoria[i][0], this.trajetoria[i][1], 5, 5)
        }
    }

    atirar()
    {
        var novoAngulo = canhao.angle - 30;
        novoAngulo = novoAngulo * (3.14/180);
        var velocity = p5.Vector.fromAngle(novoAngulo);
        velocity.mult(0.3);
        Matter.Body.setStatic(this.body, false);
        Matter.Body.setVelocity(this.body, {x: velocity.x * (180/3.14), y: velocity.y * (180/3.14)});
    }

}












