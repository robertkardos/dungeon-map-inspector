import * as _ from 'underscore';
import * as glMatrix from 'gl-matrix';

let canvas = {
	width  : window.innerWidth  - 20,
	height : window.innerHeight - 20
};
let step = 10;
let util = {
	timestamp : function () {
		return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
	},
	tileTypes : {
		'wall' : {                        // wall
			tile    : 'wall',
			isSolid : true,
			color   : 0xffffff
		},
		'road' : {                        // road
			tile    : 'road',
			isSolid : false,
			color   : 0xffffff
		},
		'room' : {                        // room
			tile    : 'room',
			isSolid : false,
			color   : 0xc3e1ff
		},
		'door' : {                        // door
			tile    : 'door',
			isSolid : false,
			color   : 0xafdfef
		},
		'waypoint' : {                    // waypoints
			tile    : 'waypoint',
			isSolid : false,
			color   : 0xff0000
		}
	},
	degToRad : function (degrees) {
		return degrees * Math.PI / 180;
	},
	rotationMatrix : function (degrees) {
		return [
			Math.cos(this.degToRad(degrees)).toFixed(),
			Math.sin(this.degToRad(degrees)).toFixed(),      // should be -
			Math.sin(this.degToRad(degrees)).toFixed() * -1, // should be +
			Math.cos(this.degToRad(degrees)).toFixed()
		];
	},
	containsObject : function (list, object) {
		for (var i = 0; i < list.length; i++) {
			if (_.isEqual(list[i], object)) {
				return false;
			}
		}
		return true;
	},
	turn : function (vector, direction) {
		switch (direction) {
			case 'left':
				glMatrix.vec2.transformMat2(vector, vector, this.rotationMatrix(-90));
				break;
			case 'right':
				glMatrix.vec2.transformMat2(vector, vector, this.rotationMatrix(90));
				break;
			case 'back':
				glMatrix.vec2.transformMat2(vector, vector, this.rotationMatrix(180));
				break;
			default:
				console.log('invalid switch direction');
		}
	}
};

export { util };
export { step };
export { canvas };
