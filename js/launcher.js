/**
* Launcher Module : Starting point
*/
var GAjs = (function (GAjs) {
  "use strict";
  var myGame = {};

  var mappedKeys = [];
  mappedKeys[27] = "escape";
  mappedKeys[38] = "arrowUp";
  mappedKeys[40] = "arrowDown";
  mappedKeys[32] = "space";
  
  function initialize() {
    var container = document.getElementById("gameContainer");
    var rect = container.getBoundingClientRect();
    myGame = new GAjs.Game(container);    
    document.addEventListener("keydown", setKeyboardInput, false);
    document.addEventListener("keyup", setKeyboardInput, false);    
  }
  function setKeyboardInput(e) {
    if (mappedKeys[e.keyCode]) {
      myGame.setInput(e.type, mappedKeys[e.keyCode]);
    }
  }  
  
  document.addEventListener("DOMContentLoaded", initialize, false);
  
  return GAjs;
}(GAjs || {}));