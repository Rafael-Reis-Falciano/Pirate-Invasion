class Boat
{
    constructor(x,y,w,h,z,barco_animacao)
    {
        this.body = Bodies.rectangle(x,y,w,h);
        this.w = w;
        this.h = h;
       // this.image = loadImage("./assets/boat.png");
        this.z = z;
        this.barco_animacao = barco_animacao;
        this.velocidade = 0.05;
        World.add(world,this.body);
        this.isBroken = false;
    }

    animacao(){
        this.velocidade += 0.05;
    }

    remove(indice){

        this.barco_animacao = barco_quebrado;
        this.velocidade = 0.05;
        this.w = 300;
        this.h = 300;
        this.isBroken = true;

        setTimeout(() => {
            Matter.World.remove(world, barcos[indice].body);
            delete barcos[indice];
        }, 2000);
    }

    display()
    {
        var angulo = this.body.angle;
        var pos = this.body.position;
        var indice = floor(this.velocidade % this.barco_animacao.length);

        console.log("animacao" + this.barco_animacao.length);
        console.log("velocidade" + this.velocidade);
        console.log(indice)

        push();
        translate(pos.x,pos.y);
        rotate(angulo);
        imageMode(CENTER);
        image(this.barco_animacao[indice], 0, this.z, this.w, this.h);
        pop();
    }
}



















