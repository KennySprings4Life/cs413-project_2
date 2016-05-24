var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(600,400, {backgroundColor: 0xfe1001});
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

var playingField = new PIXI.Container();
var mainMenu = new PIXI.Container();
var gameOver = new PIXI.Container();


var backWallSprite = new PIXI.Sprite.fromImage("backWall.png");
backWallSprite.anchor.x = 0;
backWallSprite.anchor.y = 0;
backWallSprite.position.x = 0;
backWallSprite.position.y = 0;
stage.addChild(backWallSprite);


var floorTexture = PIXI.Texture.fromImage("floor2.png");
var floorSprite = new PIXI.Sprite(floorTexture);
floorSprite.anchor.x = 0;
floorSprite.anchor.y = 0;
floorSprite.position.x = 0;
floorSprite.position.y = 130;
stage.addChild(floorSprite);


var optionsBarSprite = new PIXI.Sprite.fromImage("optionsBar.png");
optionsBarSprite.anchor.x = 0;
optionsBarSprite.anchor.y = 1;
optionsBarSprite.position.x = 0;
optionsBarSprite.position.y = 400;
stage.addChild(optionsBarSprite);

var swordTexture = new PIXI.Texture.fromImage("swordIcon.png");
var swordTextureSelected = new PIXI.Texture.fromImage("swordIconSelected.png");
var swordIcon = new PIXI.Sprite(swordTexture);
swordIcon.anchor.x = 0.5;
swordIcon.anchor.y = 0.5;
swordIcon.position.x = 50;
swordIcon.position.y = -60;
swordIcon.interactive = true;
optionsBarSprite.addChild(swordIcon);

var wandTexture = new PIXI.Texture.fromImage("wandIcon.png");
var wandTextureSelected = new PIXI.Texture.fromImage("wandIconSelected.png");
var wandIcon = new PIXI.Sprite(wandTexture);
wandIcon.anchor.x = 0.5;
wandIcon.anchor.y = 0.5;
wandIcon.position.x = 50;
wandIcon.position.y = -30;
wandIcon.interactive = true;
optionsBarSprite.addChild(wandIcon);

var wandContainer = new PIXI.Container();
wandContainer.interactive = true;
wandContainer.visible = false;

var waterTexture = new PIXI.Texture.fromImage("waterSprite.png");
var waterTextureSelected = new PIXI.Texture.fromImage("waterSpriteSelected.png");
var waterIcon = new PIXI.Sprite(waterTexture);
waterIcon.interactive = true;
waterIcon.anchor.x = 0.5;
waterIcon.anchor.y = 0.5;
waterIcon.position.x = 45;
waterIcon.position.y = -30;
wandContainer.addChild(waterIcon);

var fireTexture = new PIXI.Texture.fromImage("fireSprite.png");
var fireTextureSelected = new PIXI.Texture.fromImage("fireSpriteSelected.png");
var fireIcon = new PIXI.Sprite(fireTexture);
fireIcon.interactive = true;
fireIcon.anchor.x = 0.5;
fireIcon.anchor.y = 0.5;
fireIcon.position.x = 45;
fireIcon.position.y = 0;
wandContainer.addChild(fireIcon);

var hero = new PIXI.Sprite.fromImage("hero.png");
hero.anchor.x = 0.5;
hero.anchor.y = 0.5;
hero.position.x = 130;
hero.position.y = 250;
hero.attackType = "null";
hero.enemy = "null";
stage.addChild(hero);

wandIcon.addChild(wandContainer);


//
var monsterContainer = new PIXI.Container();
monsterContainer.numMonsters = 3;
stage.addChild(monsterContainer);


//Generate the body of the 'Eye Monster'
var evilSlime = new PIXI.Sprite.fromImage("EyeMonster-Body.png"); 
evilSlime.interactive = true;
evilSlime.anchor.x = 0.5;
evilSlime.anchor.y = 0.5;
evilSlime.position.x = 400;  //400	//163 == killzone
evilSlime.position.y = 250;
evilSlime.health = 100;
monsterContainer.addChild(evilSlime);

//Health Bar for the Monster
var healthBar = new PIXI.Text("Monster Health: 100", {font:"30px Arial Bold", fill: "#fff", strokeThickness: 5});
healthBar.anchor.x = 0.5;
healthBar.anchor.y = 0.5;
healthBar.position.x = 400;
healthBar.position.y = -50;
optionsBarSprite.addChild(healthBar);

//Generate the Eye of the 'Eye Monster' seperately so that the eye can be animated later.
var evilEye = new PIXI.Sprite.fromImage("EyeMonster-Eye.png");
evilEye.anchor.x = 0.5;
evilEye.anchor.y = 0.5;
evilEye.position.x = 0;
evilEye.position.y = -4;
evilSlime.addChild(evilEye);



//Attack Icon Mouse Handlers
function mouseHandlerSwordIcon(e) {
	wandContainer.visible = false;
	monsterContainer.interactive = true;
	hero.attackType = "sword";
	wandIcon.texture = wandTexture;
	fireIcon.texture = fireTexture;
	waterIcon.texture = waterTexture;
	swordIcon.texture = swordTextureSelected;
}

function mouseHandlerWandIcon(e) {
	wandContainer.visible = true;
	wandIcon.texture = wandTextureSelected;
	fireIcon.texture = fireTexture;
	waterIcon.texture = waterTexture;
	swordIcon.texture = swordTexture;
}
function mouseHandlerFireIcon(e) {
	hero.attackType = "fire";
	wandIcon.texture = wandTextureSelected;
	fireIcon.texture = fireTextureSelected;
	waterIcon.texture = waterTexture;
	swordIcon.texture = swordTexture;
}

function mouseHandlerWaterIcon(e) {
	hero.attackType = "water";
	wandIcon.texture = wandTextureSelected;
	fireIcon.texture = fireTexture;
	waterIcon.texture = waterTextureSelected;
	swordIcon.texture = swordTexture;
}

//Attack Icon listeners
wandIcon.on('mousedown', mouseHandlerWandIcon);
swordIcon.on('mousedown', mouseHandlerSwordIcon);
fireIcon.on('mousedown', mouseHandlerFireIcon);
waterIcon.on('mousedown', mouseHandlerWaterIcon);


function attack(){
	var canMove = true;
	animateHero('+');
	setTimeout(function(){ animateHero("-"); }, 250);
	if(hero.attackType == "sword"){
		evilSlime.health -= 10;
		
	}else if(hero.attackType == "fire"){
		evilSlime.health += 20;
		
	}else{
		canMove = false;
		if (evilSlime.position.x <= 550){
			evilSlime.position.x += 30;
			window.alert("Slime position = "+ evilSlime.position.x);
		}
	}
	healthBar.text = "Monster Health: " + evilSlime.health;
	if(evilSlime.health <= 0 && monsterContainer.one == true){
		monsterContainer.numMonsters -= 1;
		monsterContainer.one = false;
		evilSlime.destroy();
		monsterContainer.removeChild(evilSlime);
	}
	
	if(monsterContainer.numMonsters <= 0){
		window.alert("You have won!");
		//stage.destroy();
		
	}
	if(canMove == true){
		evilSlime.position.x -= 250;
	}
	if(evilSlime.position.x <= 163){
		evilSlime.position.x = 163;
		window.alert("You have lost");
		
	}
}



function mouseHandlerEye(e) {
	hero.enemy = evilSlime;
	if(hero.attackType != "null"){
		attack();
	}
	
}


//Monster Sprite Mouse Handlers
evilSlime.on('mousedown', mouseHandlerEye);


//Sprite Animations
function animateHero(direction) {
	if(direction == "+"){
		hero.position.x += 10;
		renderer.render(stage);
	}else{
		hero.position.x -= 10;
		renderer.render(stage);
	}
	
}

function animate() {
	requestAnimationFrame(animate);
	renderer.render(stage);
}
animate();
