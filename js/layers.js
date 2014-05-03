 /**
 * Layer module
 */
var GAjs = (function (GAjs) {
  "use strict";
  
  GAjs.Layer = function(height, width, img, scroll, boxes) {
    this.background = null;
    var height = height;
    var width = width;
    if(img) {
      this.background = {
        image : img
      };
      this.background.height = this.background.image.height;
      this.background.width = this.background.image.width;      
    }
    this.scroll = scroll;
    this.boxes = (boxes || []);

    this.update = function () {
      if(this.background && this.scroll) {
        this.scroll.x -= this.scroll.speed;
        if(this.scroll.x + this.background.width < 0) {
          this.scroll.x += this.background.width;
        }
      }
      var boxesToRemove = [];
      for (var i=0; i < this.boxes.length; i++) {        
          this.boxes[i].update(
            this.scroll ? this.scroll.speed : 0, 
            .05);
          if(!isStillInScreen(this.boxes[i])) {
            boxesToRemove.push(i);
          }
      }
      if(boxesToRemove.length > 0) {
        boxesToRemove.reverse();
        for (var i=0; i < boxesToRemove.length ; i++) {
          this.boxes.splice(boxesToRemove[i],1);
          console.log('r')
        }
      }
    };
    function isStillInScreen(box) {
       return (box.x2>=0);
    }
  }  
    
  return GAjs;
}(GAjs || {}));