function Node(){
  this.fillColor = #000000;
  this.surround = 0;
}

Node.prototype.isClickable = function () {
    if(node.fillColor != #000000) {
      return false;
    }
    return true;
  }
  
Node.prototype.getOwner = function() {
  return this.color;
}

Node.prototype.surrounds = function() {
  if (this.surrounds >= 4) {
    this.fillColor = #000000;
  }
}
