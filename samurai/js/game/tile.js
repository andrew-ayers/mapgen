var Tile = function(x, y, size) {
  this.x = x;
  this.y = y;
  this.size = size;
};

Tile.prototype.draw = function(ctx) {
  ctx.strokeStyle = "#000000";
  ctx.strokeRect(this.x, this.y, this.size, this.size);
};


Tile.prototype.drawBlack = function(ctx) {
  ctx.fillStyle = "#FF1919";
  ctx.fillRect(this.x, this.y, this.size, this.size);
};
