import "./style.css";

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const FOV = 75; //field of view at 75 degrees
const viewMin = 0.1;
const viewMax = 1000;

// object loader
const gltfLoader = new GLTFLoader();
// create scene
const scene = new THREE.Scene();
// camera with params
const camera = new THREE.PerspectiveCamera(
    FOV,
    window.innerWidth / window.innerHeight,
    viewMin,
    viewMax
);
// creates renderer targeting canvas
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
});

// loads object
let bear;
gltfLoader.load("./assets/BEAR-textured-9-22-24.gl.gltf", (gltf) => {
    bear = gltf.scene;
    gltf.scene.scale.set(10, 10, 10);
    scene.add(bear);
});

// set pixel ratio based on device screen
renderer.setPixelRatio(window.devicePixelRatio);
// sets renderer to full size of window
renderer.setSize(window.innerWidth, window.innerHeight);
// position the camera to 30 on Z axis
camera.position.setZ(40);

renderer.render(scene, camera);

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);
const controls = new OrbitControls(camera, renderer.domElement);
// animation loop
function animate() {
    requestAnimationFrame(animate);

    // bear.rotation.x += 0.01;
    bear.rotation.y += 0.01;
    bear.position.setY(-10);
    // bear.rotation.z += 0.01;
    controls.update();
    renderer.render(scene, camera);
}

animate();
