
 /**
 * Boxes module
 */
var GAjs = (function (GAjs) {
  "use strict";
 
  GAjs.TextBox = function (args) {
    this.font = args.font;
    this.color = args.color;
    this.x = args.x;
    this.x2 = args.x2;
    this.y = args.y;
    this.text = "";
    
    this.update = function (){
    
    }
  }
  GAjs.Box = function (args) {  
    this.width = args.width;
    this.height = args.height;
    this.x = args.x;
    this.x2 = args.x + args.width;
    this.y = args.y;
    this.y2 = args.y + args.height;
    this.sprite = args.img;
    
    this.collisionBoxes = ( args.collisionBoxes ||[]);
    
    this.speedY = 0;
    var isStatic = args.isStatic;
    
    this.update = function (speedX, gravity) {
      this.x -= speedX;
      this.x2 -= speedX;
      if(!isStatic) {
        this.speedY += gravity
        this.y += this.speedY;
        this.y2 += this.speedY;
      }
    };
    this.collidesWith = function(obj) {
      for(var i = 0; i < this.collisionBoxes.length; i++) {
        for(var j = 0; j < obj.collisionBoxes.length; j++) {
          if(doCollide(this.x, this.y, this.collisionBoxes[i], obj.x, obj.y, obj.collisionBoxes[j] )) {
            return true;
          }
        }
      }
      return false;
    }
    function doCollide(parentObj1X, parentObj1Y, obj1, parentObj2X, parentObj2Y, obj2) {
      var obj1X = parentObj1X + obj1.x;
      var obj1X2 = parentObj1X + obj1.x2;
      var obj1Y = parentObj1Y + obj1.y;
      var obj1Y2 = parentObj1Y + obj1.y2;      
      var obj2X = parentObj2X + obj2.x;
      var obj2X2 = parentObj2X + obj2.x2;
      var obj2Y = parentObj2Y + obj2.y;
      var obj2Y2 = parentObj2Y + obj2.y2;         
      return !((obj1Y2 < obj2Y) || (obj1Y > obj2Y2) || (obj1X2 < obj2X) ||	(obj1X > obj2X2));
    }
  }
  
     
  return GAjs;
}(GAjs || {}));