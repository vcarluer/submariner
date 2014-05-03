 /**
 * Rendering module
 */
var GAjs = (function (GAjs) {
  "use strict";
  

  GAjs.Screen = function(cnv) {
  
    var buffer = window.document.createElement("canvas");
    var bufferWidth = 640;
    var bufferHeight = 480;
    buffer.setAttribute("width", bufferWidth);
    buffer.setAttribute("height", bufferHeight);
    var bufferContext = buffer.getContext('2d');

    var canvas = cnv;
    var canvasContext = canvas.getContext('2d');
    var canvasHeight = canvas.height;
    var canvasWidth = canvas.width;
    
    var ratioHeight = bufferHeight / canvasHeight;
    var ratioWidth = bufferWidth / canvasWidth;    
  
    this.draw = function (layers) {
      clear();
      for (var i = 0; i < layers.length; i++) {
        drawLayer(layers[i]);
      }
      render();
    };
    this.drawLoadingSreen  = function(loadingScreenUrl) {
      var backgroundImage = new Image(); 
      backgroundImage.src = loadingScreenUrl;
      backgroundImage.onload = function () {
        canvasContext.drawImage(backgroundImage, 0, 0);
      }
    };
    this.drawSplashScreen = function (splashScreen) {
      bufferContext.drawImage(splashScreen, 0, 0);
      render();
    };
    function drawLayer(layer) {
      if(layer.background) {
        if(layer.scroll) {
          var startX = -layer.scroll.x;
          var pixelsLeft = layer.background.width - startX;
          var bHeight = layer.background.height;
          bufferContext.drawImage(layer.background.image, 
            startX, 0,
            pixelsLeft, bHeight,
            0, 0,
            pixelsLeft, bHeight);
          if(pixelsLeft <= bufferWidth) {
            bufferContext.drawImage(layer.background.image, 
              0, 0,
              layer.background.width - pixelsLeft, bHeight,
              pixelsLeft, 0,
              layer.background.width - pixelsLeft, bHeight);            
          }
        } else {
          bufferContext.drawImage(layer.background.image, 0, 0);
        }
      }
      for (var i = 0; i < layer.boxes.length; i++) {
        drawBox(layer.boxes[i]);
      }
    }
    function drawBox(box) {
      if(box.text) {
        bufferContext.fillStyle = box.color;
        bufferContext.font = box.font;
        bufferContext.textBaseline="middle"; 
        bufferContext.fillText(box.text, box.x, box.y);        
      } else {
        bufferContext.drawImage(box.sprite, box.x, box.y);
      }
    }
    function clearBuffer(){
      bufferContext.clearRect(0, 0, bufferWidth, bufferHeight);      
    }
    function clear() {
      clearBuffer();
      canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
    }
    function render() {
      canvasContext.drawImage(buffer, 0, 0, bufferWidth, bufferHeight,0,0, canvasWidth, canvasHeight);
    }    
  }  
       
  return GAjs;
}(GAjs || {}));