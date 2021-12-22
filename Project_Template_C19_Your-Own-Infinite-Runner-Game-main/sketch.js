var path,  mainRacer;
var opponantCar1,opponantCar2,opponantCar3;
var pathImg,mainRacerImg;

var oppPinkImg;
var oppDarkPinkImg;
var oppGreenImg;
var gameOverImg,cycleBell;

var pinkCG, darkPinkCG,greenCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;
function preload(){
    pathImg = loadImage("Road.png");
    mainRacerImg =loadImage ("mainCar.png");
    
    oppPinkImg = loadImage("obstacle 2.png");
    
    oppDarkPinkImg = loadImage("obstacle 1.png");
    
    oppGreenImg = loadImage("obstacle 3.png");
    
    gameOverImg = loadImage("gameOver.png");
}

function setup() {
   
createCanvas(1200,300);

path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;


mainRacer = createSprite(70,150);
  mainRacer.addImage(mainRacerImg);
  mainRacer.scale=0.07;
  
  mainRacer.setCollider("rectangle",0,0,40,40,50);

  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
pinkCG = new Group();
darkPinkCG = new Group();
greenCG = new Group();
}

function draw() {
    background(0);
  
    drawSprites();
    textSize(20);
    fill(255);
    text("Distance: "+ distance,900,30);
    
    if(gameState===PLAY){
      
     distance = distance + Math.round(getFrameRate()/50);
     path.velocityX = -(6 + 2*distance/150);
    
       mainRacer.y = World.mouseY;
    
     edges= createEdgeSprites();
       mainRacer.collide(edges);
    
    //code to reset the background
    if(path.x < 0 ){
      path.x = width/2;
    }

    var select_oppPlayer = Math.round(random(1,3));
    
    if (World.frameCount % 150 == 0) {
      if (select_oppPlayer == 1) {
        pinkCar();
      } else if (select_oppPlayer == 2) {
        darkPinkCar();
      } else {
        greenCar();
      }
    }
    
     if(pinkCG.isTouching(  mainRacer)){
       gameState = END;
       opponantCar1.velocityY = 0;
       opponantCar2.velocityY = 0;
       opponantCar3.velocityY = 0;
      }
      
      if(pinkCG.isTouching(  mainRacer)){
        gameState = END;
        opponantCar1.velocityY = 0;
        opponantCar2.velocityY = 0;
        opponantCar3.velocityY = 0;
      }
      
      if(darkPinkCG.isTouching(  mainRacer)){
        gameState = END;
        opponantCar1.velocityY = 0;
        opponantCar2.velocityY = 0;
        opponantCar3.velocityY = 0;
      }
      
  }else if (gameState === END) {
      gameOver.visible = true;
    
      textSize(20);
      fill(255);
      text("Press Up Arrow to Restart the game!", 500,200);
    
      path.velocityX = 0;
        mainRacer.velocityY = 0;
    
      pinkCG.setVelocityXEach(0);
      pinkCG.setLifetimeEach(-1);
    
      yellowCG.setVelocityXEach(0);
      yellowCG.setLifetimeEach(-1);
    
      redCG.setVelocityXEach(0);
      redCG.setLifetimeEach(-1);
  
       if(keyDown("UP_ARROW")) {
         reset();
       }
  }
  
}
function pinkCar(){
    player1 =createSprite(1100,Math.round(random(50, 250)));
    player1.scale =0.06;
    player1.velocityX = -(6 + 2*distance/150);
    player1.setLifetime=170;
    pinkCG.add(opponantCar1);
}

function darkPinkCar(){
    player2 =createSprite(1100,Math.round(random(50, 250)));
    player2.scale =0.06;
    player2.velocityX = -(6 + 2*distance/150);
    player2.setLifetime=170;
    darkPinkCG.add(opponantCar2);
}

function greenCar(){
    player3 =createSprite(1100,Math.round(random(50, 250)));
    player3.scale =0.06;
    player3.velocityX = -(6 + 2*distance/150);
    player3.setLifetime=170;
    greenCG.add(opponantCar3);
}



function reset(){
gameState = PLAY;
gameOver.visible = false;
  mainRacer.addImage("SahilRunning",mainRacerImg1);

pinkCG.destroyEach();
darkPinkCG.destroyEach();
greenCG.destroyEach();

distance = 0;
}
