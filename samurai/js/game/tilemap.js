var TileMap = function(canvas, tile_size) {
  this.tile_size = tile_size;

  this.width = canvas.width;
  this.height = canvas.height;
  this.ctx = canvas.ctx;

  this.grid = [];
};

TileMap.prototype.build = function() {
  for (var y = 0; y < this.height; y++) {
    this.grid[y] = [];
    for (var x = 0; x < this.width; x++) {
      this.grid[y][x] = new Tile(x * this.tile_size, y * this.tile_size,
        this.tile_size);
    }
  }
};

TileMap.prototype.draw = function() {
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      this.grid[y][x].draw(this.ctx, 0);
    }
  }
};
