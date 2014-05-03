/**
 * Game data module
 */
var GAjs = (function (GAjs) {
  "use strict";
    
  GAjs.data = {};
  GAjs.data.graphicAssets = {
    startScreen : "assets/img/startScreen.png",
    loadingScreen : "assets/img/loadScreen.png",
    gameOverScreen : "assets/img/gameOverScreen.png",
    pauseScreen : "assets/img/pauseScreen.png",
    background : "assets/img/background.png",
    foreground : "assets/img/foreground.png",
    submarine : "assets/img/submarine.png",
    submarineExplode : "assets/img/submarine-explode.png",
    effects : "assets/img/effect-2.png",
    obstacleDesc : "assets/img/obstacleDesc.png",
    obstacleAsc : "assets/img/obstacleAsc.png",
    obstacleBoth : "assets/img/obstacleBoth.png"
  }
  GAjs.data.soundAssets = {
    sonar : "assets/sounds/sonar.mp3",
    explosion : "assets/sounds/underwater.mp3"
  }
  GAjs.data.splashScreens = {
    loading : 'loadingScreen',
    start : 'startScreen',
    gameOver : 'gameOverScreen',
    pause : 'pauseScreen'
  };
  GAjs.data.itemDefs = {};
  GAjs.data.itemDefs.obstacleDesc = {
    img :"obstacleDesc",
    width : 40,
    height : 350,  
    x : 700,
    y : -150,
    minY : -150,
    maxY : -80,
    isStatic : true,
    collisionBoxes : [
      {x : 2, x2: 38, y : 0, y2 : 175},
      {x : 10, x2: 30, y : 175, y2 : 265},
      {x : 14, x2: 26, y : 265, y2 : 350}
    ]
  };
  GAjs.data.itemDefs.obstacleAsc = {
    img : "obstacleAsc",
    width : 40,
    height : 350,  
    x : 700,
    y : 330,
    minY : 230,
    maxY : 330, 
    isStatic : true,
    collisionBoxes : [
      {x:2, x2:38, y:175, y2:350},
      {x:10, x2:30, y:85, y2:175},
      {x:14, x2:26, y:0, y2:85}
    ]
  };
  GAjs.data.itemDefs.obstacleBoth = {
    img : "obstacleBoth",
    width : 40,
    height : 350,  
    x : 700,
    y : 0,
    minY : -220,
    maxY : 0,
    isStatic : true,
    collisionBoxes : [
      {x : 2, x2: 38, y : 0, y2 : 103},
      {x : 10, x2: 30, y : 103, y2 : 193},
      {x : 14, x2: 26, y : 193, y2 : 278},
      {x : 2, x2: 38, y : 597, y2 : 700},
      {x : 10, x2: 30, y : 507, y2 : 597},
      {x : 14, x2: 26, y : 422, y2 : 507}
    ]
  };
  GAjs.data.itemDefs.character = { 
    img : "submarine",
    x : 100,
    y : 220,
    width : 80,
    height : 23,
    isStatic : false,
    collisionBoxes : [
      { x: 4, x2 : 18, y : 9, y2 : 18},
      { x: 18, x2 : 80, y : 7, y2 : 23},
      { x: 34, x2 : 46, y : 0, y2 : 7}
    ]
  };
  
  
  return GAjs;
}(GAjs || {}));