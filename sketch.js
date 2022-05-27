var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(300, 300);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.4;
  doorsGroup = new Group(); 
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
}

function draw() {
  background("black");
  if (gameState === "play") {
    
  
    if (tower.y > 400) {
      tower.y = 300
    
    }
    if (keyDown(UP_ARROW)) {
      ghost.velocityY = -10;
    }
    ghost.velocityY = ghost.velocityY + 0.5;
    if (keyDown(LEFT_ARROW)) {
      ghost.x = ghost.x - 2;
    }
    if (keyDown(RIGHT_ARROW)) {
      ghost.x = ghost.x + 2;
    }
    if (ghost.isTouching(climbersGroup)) {
      ghost.velocityY = 0;
    }
    if (ghost.isTouching(invisibleBlockGroup) || ghost.y > 600) {
      gameState = "end";
      
    }
    createDoor();
    drawSprites();

  }
  else {
    textSize(25);
    fill("orange");
    text("Game Over", 200, 300);
    
  }
}
function createDoor() {
  if (frameCount % 150 === 0) {
    door = createSprite(200, -50);
    door.addImage("door", doorImg);
    door.velocityY = 1;
    climber = createSprite(200, 10);
    climber.addImage("climber", climberImg);
    climber.velocityY = 1;
    invisibleBlock = createSprite(200, 15,60,10);
    invisibleBlock.velocityY = 1;
    invisibleBlock.visible = false;
    door.x = Math.round(random(120, 400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock)

  }
}
