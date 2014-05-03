/**
* Utilities Module
*/  
var GAjs = (function (GAjs) {
  "use strict";
  
  // requestAnimationFrame normalization
  window.requestAnimationFrame = function() {
      return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      function(f) {
        window.setTimeout(f,1e3/60);
      }
  }();
  
  GAjs.utils = {};
  
  GAjs.utils.randomInInterval = function (min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }
 
  return GAjs;
}(GAjs || {}));
