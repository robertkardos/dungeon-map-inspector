import * as THREE from 'three';
import { util, step } from './util';

export class Wall {
	constructor (map, xCoord, yCoord) {
		var middleOfWallGeometry  = new THREE.BoxGeometry(0.2 * step, 0.2 * step, 1 * step);

		var fullUpWallGeometry    = new THREE.BoxGeometry(0.2 * step, 0.2 * step, 1 * step);
		var fullRightWallGeometry = new THREE.BoxGeometry(0.2 * step, 0.2 * step, 1 * step);
		var fullDownWallGeometry  = new THREE.BoxGeometry(0.2 * step, 0.2 * step, 1 * step);
		var fullLeftWallGeometry  = new THREE.BoxGeometry(0.2 * step, 0.2 * step, 1 * step);

		var thinUpWallGeometry    = new THREE.BoxGeometry(0.2 * step, 0.4 * step, 1 * step);
		var thinRightWallGeometry = new THREE.BoxGeometry(0.4 * step, 0.2 * step, 1 * step);
		var thinDownWallGeometry  = new THREE.BoxGeometry(0.2 * step, 0.4 * step, 1 * step);
		var thinLeftWallGeometry  = new THREE.BoxGeometry(0.4 * step, 0.2 * step, 1 * step);

		var cornerRUWallGeometry  = new THREE.BoxGeometry(0.2 * step, 0.2 * step, 1 * step);
		var cornerRDWallGeometry  = new THREE.BoxGeometry(0.2 * step, 0.2 * step, 1 * step);
		var cornerLDWallGeometry  = new THREE.BoxGeometry(0.2 * step, 0.2 * step, 1 * step);
		var cornerLUWallGeometry  = new THREE.BoxGeometry(0.2 * step, 0.2 * step, 1 * step);

		var wallMatrix = [
			[],
			[],
			[],
		];
		var currentWall = new THREE.Geometry();

		var position = new THREE.Vector2(-1, -1);

		var mapTile;

		for (var y = 0; y < 3; y++) {
			position.x = -1;
			for (var x = 0; x < 3; x++) {
				if (map[yCoord + position.y] === undefined || map[yCoord + position.y][xCoord + position.x] === undefined) {
					wallMatrix[y][x] = false;
				} else {
					mapTile = map[yCoord + position.y][xCoord + position.x];
					wallMatrix[y][x] = util.tileTypes[mapTile.type].isSolid;
				}
				position.x += 1;
			}
			position.y += 1;
		}

		var meshes = [],
		centerOfWall,
		thinUpWall,
		thinRightWall,
		thinDownWall,
		thinLeftWall;

		var material = new THREE.MeshPhongMaterial({color : 0x3344ff});

		centerOfWall = new THREE.Mesh(middleOfWallGeometry, material);
		meshes.push(centerOfWall);

		if (wallMatrix[2][1]) {
			thinUpWall = new THREE.Mesh(thinUpWallGeometry, material);
			thinUpWall.position.y = 0.3 * step;
			meshes.push(thinUpWall);
		}

		if (wallMatrix[1][2]) {
			thinRightWall = new THREE.Mesh(thinRightWallGeometry, material);
			thinRightWall.position.x = 0.3 * step;
			meshes.push(thinRightWall);
		}

		if (wallMatrix[0][1]) {
			thinDownWall = new THREE.Mesh(thinDownWallGeometry, material);
			thinDownWall.position.y = - 0.3 * step;
			meshes.push(thinDownWall);
		}

		if (wallMatrix[1][0]) {
			thinLeftWall = new THREE.Mesh(thinLeftWallGeometry, material);
			thinLeftWall.position.x = - 0.3 * step;
			meshes.push(thinLeftWall);
		}

		for (var i = 0; i < meshes.length; i++) {
			meshes[i].updateMatrix();
			currentWall.merge(meshes[i].geometry, meshes[i].matrix);
		}

		return new THREE.Mesh(currentWall, new THREE.MeshPhongMaterial({
			color : util.tileTypes['wall'].color
			// ,
			// map   : tileTexture
		}));
	}
}
