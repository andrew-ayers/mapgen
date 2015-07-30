var Keyboard = function() {
       
    this.status = {
	'up': false,
	'down': false,
	'left': false,
	'right': false,
	'space': false
    };

    this.changeStatus = function(type, dir) {
	if (type === 'keydown')
	{
	    this.status[dir] = true;
	}
	else if (type === 'keyup')
	{
	    this.status[dir] = false;
	}
    };

    this.input = function(event) {
	switch (event.keyCode) {
	    case 27:
		event.preventDefault();
		cancelAnimationFrame(requestID);
		break;
	    case 65: // Left
		event.preventDefault();
		this.changeStatus(event.type, 'left');
		break;
	    case 87: // Up
		event.preventDefault();
		this.changeStatus(event.type, 'up');
		break;
	    case 68: // Right
		event.preventDefault();
		this.changeStatus(event.type, 'right');
		break;
	    case 83: // Down
		event.preventDefault();
		this.changeStatus(event.type, 'down');
		break;
	    case 32: // Down
		event.preventDefault();
		this.changeStatus(event.type, 'space');
		break;
	    default:
		break;
	}
    };

    this.listen = function() {
	var self = this;
	window.addEventListener('keyup', function(event) {
	    self.input(event);
	}, false);

	window.addEventListener('keydown', function(event) {
	    self.input(event);
	}, false);
    };

};