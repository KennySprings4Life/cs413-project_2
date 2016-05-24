var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(600,400, {backgroundColor: 0x0});
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

var playingField = new PIXI.Container();
var mainMenu = new PIXI.Container();
var credits = new PIXI.Container();
var manual = new PIXI.Container();
var gameOver = new PIXI.Container();

//Main Menu
//**
function setMainMenu(){
	stage.removeChildren();


	//Play Game
	var playIconTexture = new PIXI.Texture.fromImage("play.png");
	var playIcon = new PIXI.Sprite(playIconTexture);
	playIcon.anchor.x = 0.5;
	playIcon.anchor.y = 0;
	playIcon.position.x = 300;
	playIcon.position.y = 30;
	playIcon.interactive = true;
	mainMenu.addChild(playIcon);

	//Instructions
	var instructionsIconTexture = new PIXI.Texture.fromImage("manual.png");
	var instructionsIcon = new PIXI.Sprite(instructionsIconTexture);
	instructionsIcon.anchor.x = 0.5;
	instructionsIcon.anchor.y = 0;
	instructionsIcon.position.x = 300;
	instructionsIcon.position.y = 160;
	instructionsIcon.interactive = true;
	mainMenu.addChild(instructionsIcon);

	//Credits
	var creditsIconTexture = new PIXI.Texture.fromImage("credits.png");
	var creditsIcon = new PIXI.Sprite(creditsIconTexture);
	creditsIcon.anchor.x = 0.5;
	creditsIcon.anchor.y = 0;
	creditsIcon.position.x = 300;
	creditsIcon.position.y = 290;
	creditsIcon.interactive = true;
	mainMenu.addChild(creditsIcon);
	
	//Add the Menu to the stage
	stage.addChild(mainMenu);
	
	
	function mouseHandlerPlay(e){
		//mainMenu.removeChildren();
		setField();
	}
	playIcon.on('mousedown', mouseHandlerPlay);
	
	function mouseHandlerCredits(e){
		//mainMenu.removeChildren();
		setCredits();
	}
	creditsIcon.on('mousedown', mouseHandlerCredits);
	
	function mouseHandlerInstructions(e){
		//mainMenu.removeChildren();
		setInstructions();
	}
	instructionsIcon.on('mousedown', mouseHandlerInstructions);
	
	
}

function setCredits(){
	stage.removeChildren();
	stage.addChild(credits);
	
	var myFace = new PIXI.Sprite.fromImage("myFace.png");
	myFace.anchor.x = 0.5;
	myFace.anchor.y = 0.5;
	myFace.position.x = 300;
	myFace.position.y = 200;
	
	//Add My Face to the Credits screen
	credits.addChild(myFace);
	
	var goHome = new PIXI.Sprite.fromImage("plainHome.png");
	goHome.anchor.x = 0;
	goHome.anchor.y = 0;
	goHome.position.x = 15;
	goHome.position.y = 15;
	goHome.interactive = true;
	
	//Add the Home button to the Credits screen
	credits.addChild(goHome);
	
	function mouseHandlerCreditsHome(e){
		setMainMenu();
	}
	goHome.on('mousedown', mouseHandlerCreditsHome);
}

function setInstructions(){
	stage.removeChildren();
	stage.addChild(manual);
	
	var textContainer = new PIXI.Container();
	textContainer.position.x = 25;
	textContainer.position.y = 150;
	var line1 = new PIXI.Text("To play the game you must select an attack by clicking on the \n\
	icons at the bottom of the screen and then clicking on your enemy.\n\
	After each move you make, your enemy will  advance towards you:\n\
	Each of the attacks will have it's own special effect:\n\
	You will not be able to win with just one move type.\n\
	Kill it before it reaches you!", {font:"20px Arial Bold", fill: "#fff", strokeThickness: 1});
	//var line2 = new PIXI.Text("To play the game you must select an attack by clicking on \n the icons", {font:"30px Arial Bold", fill: "#fff", strokeThickness: 1});
	
	textContainer.addChild(line1);
	manual.addChild(textContainer);
	
	var goHome = new PIXI.Sprite.fromImage("plainHome.png");
	goHome.anchor.x = 0;
	goHome.anchor.y = 0;
	goHome.position.x = 15;
	goHome.position.y = 15;
	goHome.interactive = true;
	
	//Add the Home button to the Manual screen
	manual.addChild(goHome);
	
	function mouseHandlerCreditsHome(e){
		setMainMenu();
	}
	goHome.on('mousedown', mouseHandlerCreditsHome);
	
	
}




function setGameOver(hasLost){
	stage.removeChildren();
	stage.addChild(gameOver);
	
	var gameOverSprite = new PIXI.Sprite.fromImage("gameOver.png");
	gameOverSprite.anchor.x = 0.5;
	gameOverSprite.anchor.y = 0.5;
	gameOverSprite.position.x = 300;
	gameOverSprite.position.y = 200;
	
	var winSprite = new PIXI.Sprite.fromImage("waterSpriteSelected.png");
	winSprite.anchor.x = 0.5;
	winSprite.anchor.y = 0.5;
	winSprite.position.x = 300;
	winSprite.position.y = 200;
	
	var menuText = new PIXI.Sprite.fromImage("home.png");
	menuText.anchor.x = 0;
	menuText.anchor.y = 0;
	menuText.position.x = 15;
	menuText.position.y = 15;
	menuText.interactive = true;
	gameOver.addChild(menuText);
	
	if(hasLost == true){
		window.alert("Gamed over");
		gameOver.addChild(gameOverSprite);
		
	}
	function mouseHandlerGMHome(e){
		setMainMenu();
	}
	menuText.on('mousedown', mouseHandlerGMHome);
	
	
}

function setField(){
	stage.removeChildren();
	stage.addChild(playingField);
	
	//Aesthetic Background
	//Brick Wall
	var backWallSprite = new PIXI.Sprite.fromImage("backWall.png");
	backWallSprite.anchor.x = 0;
	backWallSprite.anchor.y = 0;
	backWallSprite.position.x = 0;
	backWallSprite.position.y = 0;
	playingField.addChild(backWallSprite);

	//Floor
	var floorTexture = PIXI.Texture.fromImage("floor2.png");
	var floorSprite = new PIXI.Sprite(floorTexture);
	floorSprite.anchor.x = 0;
	floorSprite.anchor.y = 0;
	floorSprite.position.x = 0;
	floorSprite.position.y = 130;
	playingField.addChild(floorSprite);

	//Interafce
	//Interface Dock
	var optionsBarSprite = new PIXI.Sprite.fromImage("optionsBar.png");
	optionsBarSprite.anchor.x = 0;
	optionsBarSprite.anchor.y = 1;
	optionsBarSprite.position.x = 0;
	optionsBarSprite.position.y = 400;
	playingField.addChild(optionsBarSprite);

	//Sword Attack
	var swordTexture = new PIXI.Texture.fromImage("swordIcon.png");
	var swordTextureSelected = new PIXI.Texture.fromImage("swordIconSelected.png");
	var swordIcon = new PIXI.Sprite(swordTexture);
	swordIcon.anchor.x = 0.5;
	swordIcon.anchor.y = 0.5;
	swordIcon.position.x = 50;
	swordIcon.position.y = -60;
	swordIcon.interactive = true;
	optionsBarSprite.addChild(swordIcon);

	//Wand Attack Icon
	var wandTexture = new PIXI.Texture.fromImage("wandIcon.png");
	var wandTextureSelected = new PIXI.Texture.fromImage("wandIconSelected.png");
	var wandIcon = new PIXI.Sprite(wandTexture);
	wandIcon.anchor.x = 0.5;
	wandIcon.anchor.y = 0.5;
	wandIcon.position.x = 50;
	wandIcon.position.y = -30;
	wandIcon.interactive = true;
	optionsBarSprite.addChild(wandIcon);

	//Container that holds Wand Attack options
	var wandContainer = new PIXI.Container();
	wandContainer.interactive = true;
	wandContainer.visible = false;

	//Water Spell
	var waterTexture = new PIXI.Texture.fromImage("waterSprite.png");
	var waterTextureSelected = new PIXI.Texture.fromImage("waterSpriteSelected.png");
	var waterIcon = new PIXI.Sprite(waterTexture);
	waterIcon.interactive = true;
	waterIcon.anchor.x = 0.5;
	waterIcon.anchor.y = 0.5;
	waterIcon.position.x = 45;
	waterIcon.position.y = -30;
	wandContainer.addChild(waterIcon);

	//Fire Spell
	var fireTexture = new PIXI.Texture.fromImage("fireSprite.png");
	var fireTextureSelected = new PIXI.Texture.fromImage("fireSpriteSelected.png");
	var fireIcon = new PIXI.Sprite(fireTexture);
	fireIcon.interactive = true;
	fireIcon.anchor.x = 0.5;
	fireIcon.anchor.y = 0.5;
	fireIcon.position.x = 45;
	fireIcon.position.y = 0;
	wandContainer.addChild(fireIcon);

	//Add Icons to Wand Container after defining them
	wandIcon.addChild(wandContainer);
	
	var goHome = new PIXI.Sprite.fromImage("plainHome.png");
	goHome.anchor.x = 0;
	goHome.anchor.y = 0;
	goHome.position.x = 15;
	goHome.position.y = 15;
	goHome.interactive = true;
	
	//Add the Home button to the Manual screen
	playingField.addChild(goHome);
	
	function mouseHandlerCreditsHome(e){
		setMainMenu();
	}
	goHome.on('mousedown', mouseHandlerCreditsHome);

	//Game Characters
	//Hero
	var hero = new PIXI.Sprite.fromImage("hero.png");
	hero.anchor.x = 0.5;
	hero.anchor.y = 0.5;
	hero.position.x = 130;
	hero.position.y = 250;
	hero.attackType = "null";
	hero.enemy = "null";
	playingField.addChild(hero);

	//Monster Container
	var monsterContainer = new PIXI.Container();
	playingField.addChild(monsterContainer);

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

	//*Attack Icon Mouse Handlers
	//Highlight the Sword attack
	function mouseHandlerSwordIcon(e) {
		wandContainer.visible = false;
		monsterContainer.interactive = true;
		hero.attackType = "sword";
		wandIcon.texture = wandTexture;
		fireIcon.texture = fireTexture;
		waterIcon.texture = waterTexture;
		swordIcon.texture = swordTextureSelected;
	}

	//Highlight the Wand attack and deselect the Sword attack
	function mouseHandlerWandIcon(e) {
		wandContainer.visible = true;
		wandIcon.texture = wandTextureSelected;
		fireIcon.texture = fireTexture;
		waterIcon.texture = waterTexture;
		swordIcon.texture = swordTexture;
	}

	//Highlight the Fire Spell and deselect the Sword attack and Fire Spell
	function mouseHandlerFireIcon(e) {
		hero.attackType = "fire";
		wandIcon.texture = wandTextureSelected;
		fireIcon.texture = fireTextureSelected;
		waterIcon.texture = waterTexture;
		swordIcon.texture = swordTexture;
	}

	//Highlight the Water Spell and deselect the Sword attack and Fire Spell
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
			evilSlime.health -= 15;
			
		}else if(hero.attackType == "fire"){
			evilSlime.health -= 10;
			slime.position.x -= 10;
			slime.canMove = false;
		}else{
			canMove = false;
			if (evilSlime.position.x <= 550){
				evilSlime.position.x += 30;
				evilSlime.health += 5;
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
			evilSlime.position.x -= 35;
		}
		if(evilSlime.position.x <= 163){
			evilSlime.position.x = 163;
			window.alert("You have lost");
			setGameOver(true);
			
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
	
	
}


function animate() {
	requestAnimationFrame(animate);
	renderer.render(stage);
}
setMainMenu();
animate();
