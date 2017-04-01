import * as THREE from 'three';
import { step, canvas } from '../util';
import { worldInstance } from '../world';

export class Player {
	constructor() {
		this.world = worldInstance();

		this.velocity = 0.3 * step;

		this.mouse = new THREE.Vector2();

		this.aura = new THREE.PointLight(0xffffff, 0.5, 100 * step);
		this.aura.castShadow = true;

		this.aura.position.set(
			this.world.camera.position.x,
			this.world.camera.position.y,
			this.world.camera.position.z + 45 * step
		);
		this.world.scene.add(this.aura);

		this.pressedKeys = [];
		var handleKeyUp = (event) => {
			this.pressedKeys[event.keyCode] = false;
		};
		var handleKeyDown = (event) => {
			this.pressedKeys[event.keyCode] = true;
		};
		var onmousemove = (event) => {
			event.preventDefault();
			this.mouse.x = ( event.clientX / canvas.width ) * 2 - 1;
			this.mouse.y = - ( event.clientY / canvas.height ) * 2 + 1;
		}

		document.onmousemove = onmousemove;
		document.onkeyup = handleKeyUp;
		document.onkeydown = handleKeyDown;
	}

	move () {
		if (this.pressedKeys[87]) {
			// Up cursor key
			this.world.camera.position.y += this.velocity;
		}
		if (this.pressedKeys[65]) {
			// Left cursor key
			this.world.camera.position.x -= this.velocity;
		}
		if (this.pressedKeys[83]) {
			// Down cursor key
			this.world.camera.position.y -= this.velocity;
		}
		if (this.pressedKeys[68]) {
			// Right cursor key
			this.world.camera.position.x += this.velocity;
		}
	};

	update (intersects) {
		this.move();

		this.aura.position.set(
			this.world.camera.position.x,
			this.world.camera.position.y,
			this.world.camera.position.z - 20 * step
		);
	}
}
