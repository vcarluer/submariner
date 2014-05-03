 /**
 * Suond module
 */
var GAjs = (function (GAjs) {
  "use strict";
  
  GAjs.Sound = function() {
    var that = this;
    var currentSound = {};
    var currentCtrl = {};
    
    this.play = function(sound) {
      sound.play();
    }
    this.loop = function(sound, ctrl) {
      currentSound = sound;
      currentCtrl = ctrl;
      loopSound();
    }
    function loopSound() {
      if(!currentCtrl()) {
        currentSound = {};
        currentCtrl = {};
        return;
      }
      currentSound.currentTime = 0;
      currentSound.addEventListener('ended', loopSound, false);      
      currentSound.play();
    }
  }  
  
       
  return GAjs;
}(GAjs || {}));