const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;

var canvas, angle, tower, ground, cannon;

var canhao, bola_canhao, barco;

var bolas = [];

var barcos = [];

var barco_animacao = [];
var barco_JSON, barco_imagens;

var barco_quebrado = [];
var quebrado_JSON, quebrado_imagens;

var agua = [];
var agua_JSON, agua_imagens;

var somCanhao, somAgua, somFundo, somFim;

var pontuacao = 0;

var permissao = true;

function preload() 
{
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  barco_JSON = loadJSON("assets/boat/boat.json");
  barco_imagens = loadImage("assets/boat/boat.png");
  quebrado_JSON = loadJSON("assets/boat/brokenBoat.json");
  quebrado_imagens = loadImage("assets/boat/brokenBoat.png");
  somCanhao = loadSound("assets/cannon_explosion.mp3");
  somAgua = loadSound("assets/cannon_water.mp3");
  somFundo = loadSound("assets/background_music.mp3");
  somFim = loadSound("assets/pirate_laugh.mp3");
  agua_JSON = loadJSON("assets/waterSplash/waterSplash.json");
  agua_imagens = loadImage("assets/waterSplash/waterSplash.png");
}

function setup() 
{
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15

  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  canhao = new Cannon(170, 150, 190, 120, angle);

  var barco_frames = barco_JSON.frames;
  
  for(var i=0; i<barco_frames.length; i++){
    var pos = barco_frames[i].position;
    var img = barco_imagens.get(pos.x,pos.y,pos.w,pos.h);
    barco_animacao.push(img);
  }

  var quebrado_frames = quebrado_JSON.frames;

  for(var i=0; i<quebrado_frames.length; i++){
    var pos = quebrado_frames[i].position;
    var img = quebrado_imagens.get(pos.x,pos.y,pos.w,pos.h);
    barco_quebrado.push(img);
  }

  var agua_frames = agua_JSON.frames;

  for(var i = 0; i<agua_frames.length; i++){
    var pos = agua_frames[i].position;
    var img = agua_imagens.get(pos.x,pos.y,pos.w,pos.h);
    agua.push(img);
  }
}

function draw() 
{
  image(backgroundImg,0,0,1200,600)
  if(!somFundo.isPlaying())
  {
    somFundo.play();
    somFundo.setVolume(0.3)
  }

  Engine.update(engine);

  textSize(30);
  text("pontos:" + pontuacao, 1000, 70)
  
  rect(ground.position.x, ground.position.y, width * 2, 1);

  //bola_canhao.display()

  for(var i = 0; i < bolas.length; i++)
  {
    mostrarBolas(bolas[i],i);
    colisaoBolas(i);
  }

  mostrarBarcos();

  canhao.show();

  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();  

}

function keyReleased()
{
  if(keyCode == DOWN_ARROW && permissao === true)
  {
    permissao = false;
    
    setTimeout(() => {
      permissao = true;
    }, 4000);

    bolas[bolas.length-1].atirar();
    somCanhao.play();
    somCanhao.setVolume(0.3);
  }
}

function keyPressed()
{
  if(keyCode == DOWN_ARROW)
  {
    bola_canhao = new CannonBall(170, 150);
    bolas.push(bola_canhao);
  }
}

function mostrarBolas(bola,indice)
{
  if(bola)
  {
    bola.display();
    bola.animacao();
    if(bola.body.position.x >=width || bola.body.position.y >= height-50)
    {
      if(!bola.isSink)
      {
        somAgua.play();
        bola.remove(indice);
      }
    }
  }
}

function mostrarBarcos()
{
  if(barcos.length>0)
  {

    if(barcos[barcos.length-1] === undefined ||
      barcos[barcos.length-1].body.position.x <  width - 400)
      {
        var posicoesY = [-100, -90, -80, -70, -60];
        var posicaoY = random(posicoesY);
        var barco = new Boat(width-70, height-60, 170, 140, posicaoY,  barco_animacao);
       
        barcos.push(barco); 
      }

      for(var i=0; i<barcos.length; i++)
      {
        if(barcos[i])
        {
          Matter.Body.setVelocity(barcos[i].body, {
            x: -1,
            y: 0
          });
          barcos[i].display();
          barcos[i].animacao();
          var colisao = Matter.SAT.collides(tower, barcos[i].body);
          var isGameOver = false;
          var isLaughing = false;
          if(colisao.collided && !barcos[i].isBroken)
         {
            isGameOver = true;
            gameOver();
            if(!isLaughing && !somFim.isPlaying())
            {
              somFim.play();
              somFim.setVolume(0.1);
              isLaughing = true;
            }
          }
      }
    }
  }
 else
 {
   var barco = new Boat(width-70, height-60, 170, 140, -100, barco_animacao);
   barcos.push(barco);
 }
}

function colisaoBolas(indice){
  for(var i=0; i<barcos.length; i++)
  { 
    if(bolas[indice] !== undefined &&  barcos[i] !== undefined)
    {
      var colisao = Matter.SAT.collides(bolas[indice].body, barcos[i].body);

      if(colisao.collided)
      {
        barcos[i].remove(i);

        pontuacao += 1;

        Matter.World.remove(world,bolas[indice].body);
        delete bolas[indice];
      }
    }
  }
}

function gameOver()
{
  swal(
    {
      title: 'Game Over',
      text: "Obrigado por Jogar!",
      imageUrl: "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
      imageSize: "150x150",
      confirmButtonText: "Jogar Novamente"
    },
    function(isConfirm)
    {
      if(isConfirm)
      {
        location.reload();
      }
    }
  )
}
