var canvas;
var levels = [];
var rooms = [];
var map = [];
var objects = {
	'dirt':	{
		'id': 0,
		'char': '.',
		'desc': 'dirt'
	},
	'rock': {
		'id': 1,
		'char': 'X',
		'desc': 'rock',
	},
	'gate': {
		'id': 2,
		'char': '#',
		'desc': 'gate'
	},
	'door': {
		'id': 3,
		'char': 'D',
		'desc': 'door'
	}
};


var width = 50;
var height = 50;

for (var y = 0; y < height; y++) {
	var row = [];
	for (var x = 0; x < width; x++) {
		row[x] = objects.rock;
	}
	map[y] = row;
}

for (var i = 0; i < 10; i++) {
	addRoom();
}

for (var i = 0; i < 10; i++) {
	addHallway(pickWall());
}

addDoors();

renderToConsole();

function renderToConsole() {
	console.clear();
	
	var row = "  :";
	for (var x = 0; x < width; x+=10) {
		row += ((x < 10) ? '0' + x : x) + '..................';
	}
	
	console.log(row);

	for (var y = 0; y < height; y++) {
		var row = ((y < 10) ? '0' + y : y) + ':';
		for (var x = 0; x < width; x++) {
			row = row + (map[y][x].char + map[y][x].char);
		}

		console.log(row);
	}

	//console.log(map);
}

function addRoom(xx, yy, ww, hh) {
	var x = (typeof xx !== 'undefined') ? xx : Math.floor((Math.random() * width) + 1);
	var y = (typeof yy !== 'undefined') ? yy : Math.floor((Math.random() * height) + 1);

	room_h = (typeof hh !== 'undefined') ? hh : Math.floor((Math.random() * 10) + 5);
	room_w = (typeof ww !== 'undefined') ? ww : Math.floor((Math.random() * 10) + 5);

	if ((x + room_w) >= width) {
		x = x - (width - room_w) - 1;
	}
	
	if ((y + room_h) >= height) {
		y = y - (height - room_h) - 1;
	}

	if (x < 1) {
		x = 1;
	}
	
	if (y < 1) {
		y = 1;
	}

	rooms.push(
			{
				'height': room_h,
				'width': room_w,
				'x': x,
				'y': y
			}
	);
	
	drawRoom(rooms[rooms.length - 1]);
}

function drawRoom(room) {
	for (var y = room.y; y < (room.height + room.y); y++) {
		for (var x = room.x; x < (room.width + room.x); x++) {
			map[y][x] = objects.dirt;
		}
	}
}

function addDoors() {
	rooms.forEach(function(room) {
		// top
		for (var x = room.x; x < (room.width + room.x); x++) {
			if (map[room.y - 1][x] == objects.dirt && map[room.y][x] == objects.dirt) {
				if (map[room.y - 1][x - 1] == objects.rock && map[room.y - 1][x + 1] == objects.rock) {
					if (Math.floor((Math.random() * 5)) > 0) {
						if (Math.floor((Math.random() * 5)) > 2) {
							map[room.y - 1][x] = objects.door;
						}
						else {
							map[room.y - 1][x] = objects.gate;
						}
					}
				}
			}
		}

		// right
		for (var y = room.y; y < (room.height + room.y); y++) {
			if (map[y][room.x + room.width] == objects.dirt && map[y][room.x + room.width - 1] == objects.dirt) {
				if (map[y - 1][room.x + room.width]== objects.rock && map[y + 1][room.x + room.width] == objects.rock) {
					if (Math.floor((Math.random() * 5)) > 0) {
						if (Math.floor((Math.random() * 5)) > 2) {
							map[y][room.x + room.width] = objects.door;
						}
						else {
							map[y][room.x + room.width] = objects.gate;
						}
					}
				}
			}
		}

		// bottom
		for (var x = room.x; x < (room.width + room.x); x++) {
			if (map[room.y + room.height][x] == objects.dirt && map[room.y + room.height - 1][x] == objects.dirt) {
				if (map[room.y + room.height][x - 1] == objects.rock && map[room.y + room.height][x + 1] == objects.rock) {
					if (Math.floor((Math.random() * 5)) > 0) {
						if (Math.floor((Math.random() * 5)) > 2) {
							map[room.y + room.height][x] = objects.door;
						}
						else {
							map[room.y + room.height][x] = objects.gate;
						}
					}
				}
			}
		}

		// left
		for (var y = room.y; y < (room.height + room.y); y++) {
			if (map[y][room.x - 1] == objects.dirt && map[y][room.x] == objects.dirt) {
				if (map[y - 1][room.x - 1]== objects.rock && map[y + 1][room.x - 1] == objects.rock) {
					if (Math.floor((Math.random() * 5)) > 0) {
						if (Math.floor((Math.random() * 5)) > 2) {
							map[y][room.x - 1] = objects.door;
						}
						else {
							map[y][room.x - 1] = objects.gate;
						}
					}
				}
			}
		}

		//console.log(room);
	});
}


function pickWall() {
	var found = false;
	var result = {"x": -1, "y": -1, "dir": -1};
	while (!found) {
		var room = rooms[Math.floor((Math.random() * rooms.length))];
		var dir = Math.floor((Math.random() * 4)); // 0 = top, 1 = right, 2 = bottom, 3 = left

		switch (dir) {
			case 0:
				var pos = Math.floor((Math.random() * room.width));
				if (room.y - 1 > 0) {
					if (map[room.y - 1][pos] === objects.rock) {
						result.x = room.x + pos;
						result.y = room.y - 1;
						result.dir = dir;
						found = true;
					}
				}
				break;
			case 1:
				var pos = Math.floor((Math.random() * room.height));
				if (room.x + room.width < width) {
					if (map[pos][room.x + room.width] === objects.rock) {
						result.x = room.x + room.width;
						result.y = room.y + pos;
						result.dir = dir;
						found = true;
					}
				}
				break;
			case 2:
				var pos = Math.floor((Math.random() * room.width));
				if (room.y + room.height < height) {
					if (map[room.y + room.height][pos] === objects.rock) {
						result.x = room.x + pos;
						result.y = room.y + room.height;
						result.dir = dir;
						found = true;
					}
				}
				break;
			case 3:
				var pos = Math.floor((Math.random() * room.height));
				if (room.x - 1 > 0) {
					if (map[pos][room.x - 1] === objects.rock) {
						result.x = room.x - 1;
						result.y = room.y + pos;
						result.dir = dir;
						found = true;
					}
				}
				break;
		}
	}
	return result;

}

function addHallway(wall_pos) {
	var length = Math.floor((Math.random() * 5) + 5);
	switch (wall_pos.dir) {
		case 0:
			if ((wall_pos.y - length) > 0) {
				addRoom(wall_pos.x, wall_pos.y - length + 1, 1, length);
			}
			break;
		case 1:
			if ((wall_pos.x + length) < width) {
				addRoom(wall_pos.x, wall_pos.y, length, 1);
			}
			break;
		case 2:
			if ((wall_pos.y + length) < height) {
				addRoom(wall_pos.x, wall_pos.y, 1, length);
			}
			break;
		case 3:
			if ((wall_pos.x - length) > 0) {
				addRoom(wall_pos.x - length + 1, wall_pos.y, length, 1);
			}
			break;
	}
}


$(document).ready(function () {
//	canvas = new Canvas(800, 640, cwrapper);



//	var tilemap = new TileMap(canvas, 32);
//	tilemap.build();
//	tilemap.draw();
});
