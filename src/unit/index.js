import * as THREE from 'three';
import { step } from '../util';

export class Player {
	constructor() {
		this.geometry = new THREE.BoxGeometry(0.3 * step, 0.3 * step, 0.3 * step);

		this.mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
			color : '#3b2ed5'
		}));
		this.mesh.position.set(10 * step, 10 * step, 0.15 * step);

		this.aura = new THREE.PointLight(0xffffff, 0.5, 0.15 * step);

		this.flashLight = new THREE.SpotLight(0xffffff);

		this.flashLight.intensity = 1.0;
		this.flashLight.distance = 80 * step;
		this.flashLight.angle = Math.PI/180 * 40;
		this.flashLight.decay = 1;
		this.flashLight.castShadow = true;
		this.flashLight.shadow.darkness = 1.0;
		this.flashLight.shadow.mapSize.width  = 1024;
		this.flashLight.shadow.mapSize.height = 1024;
		this.flashLight.shadow.bias = 0.0001;
		this.flashLight.shadow.camera.near = 0.1;
		this.flashLight.shadow.camera.far = 80 * step;
		this.flashLight.shadow.camera.fov = 120;
		this.flashLight.penumbra = 0.1;
	}
}
