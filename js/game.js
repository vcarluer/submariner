
/**
* Game Module : Main module
*/
var GAjs = (function (GAjs) {
  "use strict";

  GAjs.Game = function(cnv){

    var container = cnv;    
    var containerHeight = container.height;
    var containerWidth = container.width;

    var status = 'loading'; // loading / start / playing / gameOver / pause
    var screen = new GAjs.Screen(container);
    var sound = new GAjs.Sound();
    var layers = [];
    var character = {};
    var backgroundLayer = {};
    var foregroundLayer = {};
    var characterLayer = {};
    var itemsLayer = {};
    var effectsLayer = {};
    var scoreBox = {};
    
    var score = 0;
    
    var sendNextObstacleAt = 0;
    var minIntervalBetweenObstacles = 85;
    var maxIntervalBetweenObstacles = 100;
    
    function preloadAssets(oncompletion) {
      preloadGraphicAssets(function () {
        preloadSoundAssets(oncompletion);
      });
    }
    function preloadGraphicAssets(oncompletion) {
      var loaded = 0;
      var total = Object.keys(GAjs.data.graphicAssets).length;
      var gAsset = {};
      var imgSrc = {};

      for (gAsset in GAjs.data.graphicAssets) {
        imgSrc = GAjs.data.graphicAssets[gAsset];
        GAjs.data.graphicAssets[gAsset] = new Image();
        GAjs.data.graphicAssets[gAsset].src = imgSrc;
        GAjs.data.graphicAssets[gAsset].onload = function () {
          loaded++;
          if (loaded === total) {
            oncompletion();
          }
        };
      }
    }
    function preloadSoundAssets(oncompletion) {
      var loaded = 0;
      var total = Object.keys(GAjs.data.soundAssets).length;
      var sAsset = {};
      var audioSrc = {};

      for (sAsset in GAjs.data.soundAssets) {
          audioSrc = GAjs.data.soundAssets[sAsset];
          GAjs.data.soundAssets[sAsset] = new Audio();
          GAjs.data.soundAssets[sAsset].src= audioSrc;
          GAjs.data.soundAssets[sAsset].oncanplay = function() {
          loaded++;
          if (loaded === total) {
            oncompletion();
          }
        };
      }
    }    
    function initialize() {
      for (var key in GAjs.data.itemDefs) {
         var obj = GAjs.data.itemDefs[key];
         if(obj.img) obj.img = GAjs.data.graphicAssets[obj.img];
      }
      status = "start";
      mainLoop();
    }
    function play() {
      score = 0;
      layers = [];
      
      backgroundLayer = new GAjs.Layer(
        containerHeight, containerWidth,
        GAjs.data.graphicAssets.background,
        {speed : 1, x :0},
        null
      );
      var obstacle1 = new GAjs.Box(GAjs.data.itemDefs.obstacleAsc);
      obstacle1.x = 500;       
      itemsLayer = new GAjs.Layer(
        containerHeight, containerWidth,
        null,
        {speed : 2, x :0},
        [obstacle1]
      );      
      foregroundLayer = new GAjs.Layer(
        containerHeight, containerWidth,
        GAjs.data.graphicAssets.foreground,
        {speed : 2, x :0},
        null
      );
      
      character = new GAjs.Box(GAjs.data.itemDefs.character);
      characterLayer = new GAjs.Layer(containerHeight, containerWidth, null, null, [character]);
      scoreBox = new GAjs.TextBox({
        font : "12px 'Courier New'",
        color : "#fff",
        x: 20, x2: 80,
        y : 8
      }); 
      effectsLayer = new GAjs.Layer(
        containerHeight, containerWidth,
        GAjs.data.graphicAssets.effects,
        null,
        [scoreBox]
      );
      layers.push(backgroundLayer);
      layers.push(itemsLayer);
      layers.push(foregroundLayer);
      layers.push(characterLayer);
      layers.push(effectsLayer)      
      
      // begin play
      status = "playing";
      sound.loop(GAjs.data.soundAssets.sonar, function() {  
        return(status=="playing");
      })
      mainLoop();
    }
    function checkForNewObstacles() {
      if(sendNextObstacleAt<=0) {
        throwObstacle();
        sendNextObstacleAt= GAjs.utils.randomInInterval(minIntervalBetweenObstacles, maxIntervalBetweenObstacles);
      } else {
        sendNextObstacleAt --;
      }
    }
    function throwObstacle() {
      var obstacleTypeId = Math.floor((Math.random()*3));
      var currDef = {};
      switch(obstacleTypeId) {
        case 0 :
          currDef = GAjs.data.itemDefs.obstacleDesc;
          break;
        case 1 :
          currDef = GAjs.data.itemDefs.obstacleAsc;
          break;
        case 2 :
          currDef = GAjs.data.itemDefs.obstacleBoth;
          break;
      }
      currDef.y = GAjs.utils.randomInInterval(currDef.minY, currDef.maxY);
      var obstacle = new GAjs.Box(currDef);
      itemsLayer.boxes.push(obstacle);
    }
    function update() {
      score ++;
      scoreBox.text = "Distance : " + score + "m";
      checkForNewObstacles();
      // check for collision with top / bottom
      if(character.y <= 20 || character.y2 >= (containerHeight - 20)) {
        gameOver()
      } else { // check for collision with items
        for(var i=0; i < itemsLayer.boxes.length; i++ ) {
          if(character.collidesWith(itemsLayer.boxes[i])) {  
            gameOver()
            break;
          }
        }
      }
      for(var i=0; i < layers.length; i++ ){
        layers[i].update();
      }
    }
    function gameOver() {
      character.sprite = GAjs.data.graphicAssets.submarineExplode;
      sound.play(GAjs.data.soundAssets.explosion);
      status = "gameOver";    
    }
    function mainLoop() {
			if (status === "playing") {
        requestAnimationFrame(mainLoop);
        update();
        screen.draw(layers);
			} else {
        screen.drawSplashScreen(GAjs.data.graphicAssets[GAjs.data.splashScreens[status]]);
			}    
    }
    this.setInput = function (eventType, eventArg) {
      switch (status) {
        case "playing" :
          if(eventType == "keyup" && eventArg == "arrowUp") {
            //character.speedY -= 2;
            character.speedY = -2;
          } else if (eventType == "keyup" && eventArg == "arrowDown") {
            character.speedY += 2;
          } else if (eventType == "keyup" && eventArg == "escape") {
            status = "pause";
          } 
          break;
        case "loading" :
          break;
        case "pause" :
          if(eventType == "keydown" && eventArg == "space") {
            // end pause mode game
            status = "playing";
            mainLoop();
          }
          break;          
        case "start" :
          if(eventType == "keydown" && eventArg == "space") {
            // launch game
             play();
          }
          break;
        case "gameOver" :
          if(eventType == "keydown" && eventArg == "space") {
            // launch game
             play();
          }
          break;          
      }
    };
    
    screen.drawLoadingSreen(GAjs.data.graphicAssets[GAjs.data.splashScreens[status]]);
    preloadAssets(initialize);
  };


  
 
  
  return GAjs;
}(GAjs || {}));