import * as THREE from 'three';
import { step, canvas } from './util';

let world;

class World {
	constructor(labyrinth) {
		this.scene = new THREE.Scene();

		this.gameFieldGeometry = new THREE.PlaneGeometry((labyrinth.config.width + 10) * step, (labyrinth.config.height + 10) * step, 1 * step);
		this.gameFieldMaterial = new THREE.MeshPhongMaterial({color : 0x4bdab3});
		this.gameField = new THREE.Mesh(this.gameFieldGeometry, this.gameFieldMaterial);
		this.gameField.position.set(labyrinth.config.width / 2 * step, labyrinth.config.height / 2 * step, 0);
		this.gameField.castShadow = true;
		this.gameField.receiveShadow = true;

		this.scene.add(this.gameField);

		this.camera = new THREE.PerspectiveCamera(90, canvas.width / canvas.height, 0.1, 1000);
		// this.camera.position.set((10 - 5) * step, (10 - 5) * step, 28 * step);
		this.camera.position.set(
			this.gameField.position.x,
			this.gameField.position.y,
			30 * step
		);

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(canvas.width, canvas.height);
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMapSoft = true;

		this.light = new THREE.AmbientLight(0xffffff, 0.3);
		this.scene.add(this.light);

		function buildAxis (src, dst, colorHex, dashed) {
			var geom = new THREE.Geometry(),
			mat;
			if (dashed) {
				mat = new THREE.LineDashedMaterial({ linewidth: 3, color: colorHex, dashSize: 3, gapSize: 3 });
			} else {
				mat = new THREE.LineBasicMaterial({ linewidth: 3, color: colorHex });
			}
			geom.vertices.push(src.clone());
			geom.vertices.push(dst.clone());
			geom.computeLineDistances();
			var axis = new THREE.Line( geom, mat, THREE.LineSegments );
			return axis;
		}
		function buildAxes (length) {
			var axes = new THREE.Object3D();
			axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), 0xFF0000, false ) ); // +X
			axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -length, 0, 0 ), 0xFF0000, true) ); // -X
			axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), 0x00FF00, false ) ); // +Y
			axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -length, 0 ), 0x00FF00, true ) ); // -Y
			axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), 0x0000FF, false ) ); // +Z
			axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -length ), 0x0000FF, true ) ); // -Z
			return axes;
		}
		var axes = buildAxes(1000);
		this.scene.add(axes);
	}

	render () {
		this.renderer.render(this.scene, this.camera);
	}
}

export function worldInstance (labyrinth) {
	if (!world) {
		world = new World(labyrinth);
	}
	return world;
}
