import "./style.css";

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const FOV = 75;
const viewMin = 0.1;
const viewMax = 1000;

const gltfLoader = new GLTFLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    FOV,
    window.innerWidth / window.innerHeight,
    viewMin,
    viewMax
);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
});

// loads object

// async function loadModels() {
//     bearPoseOne =  gltfLoader.load("./public/models/Bearfall.gltf");
//     bearPoseTwo =  gltfLoader.load("./public/models/Bearpose1.gltf");
//     bearPoseThree =  gltfLoader.load("./public/models/BearRun.gltf");
//     bearPoseFour =  gltfLoader.load("./public/models/Standwithpawup.gltf");
// }

// gltfLoader.load("./assets/BEAR-textured-9-22-24.gl.gltf", (gltf) => {
//     bear = gltf.scene;
//     gltf.scene.scale.set(10, 10, 10);
//     scene.add(bear);
// });

let bearPoseOne;
// let bearPoseTwo;
// let bearPoseThree;
// let bearPoseFour;
async function loadingModels() {
    gltfLoader.load(
        "models/bearPoseFun.gltf",
        function (gltf) {
            scene.add(gltf.scene);
            gltf.scene.scale.set(15, 15, 15);
            gltf.scene.position.setY(-15);
            bearPoseOne = gltf.scene;
            bearPoseOne.visible = true;
        },
        function (xhr) {
            console.log(
                "bearPoseOne" + (xhr.loaded / xhr.total) * 100 + "% loaded"
            );
        },
        function (error) {
            console.log(error);
            console.log(`Couldn't load bearPoseOne`);
        }
    );

    // gltfLoader.load(
    //     "models/Bearpose1.gltf",
    //     function (gltf) {
    //         scene.add(gltf.scene);
    //         bearPoseTwo = gltf.scene;
    //         bearPoseTwo.visible = false;
    //     },
    //     function (xhr) {
    //         console.log("bearPoseTwo" + (xhr.loaded / xhr.total) * 100 + "% loaded");
    //     },
    //     function (error) {
    //         console.log(error);
    //         console.log(`Couldn't load bearPoseTwo`);
    //     }
    // );

    // gltfLoader.load(
    //     "models/BearRun.gltf",
    //     function (gltf) {
    //         scene.add(gltf.scene);
    //         bearPoseThree = gltf.scene;
    //         bearPoseThree.visible = false;
    //     },
    //     function (xhr) {
    //         console.log("bearPoseThree" + (xhr.loaded / xhr.total) * 100 + "% loaded");
    //     },
    //     function (error) {
    //         console.log(error);
    //         console.log(`Couldn't load bearPoseThree`);
    //     }
    // );

    // gltfLoader.load(
    //     "models/Standwithpawup.gltf",
    //     function (gltf) {
    //         scene.add(gltf.scene);
    //         bearPoseFour = gltf.scene;
    //         bearPoseFour.visible = false;
    //     },
    //     function (xhr) {
    //         console.log("bearPoseFour" + (xhr.loaded / xhr.total) * 100 + "% loaded");
    //     },
    //     function (error) {
    //         console.log(error);
    //         console.log(`Couldn't load bearPoseFour`);
    //     }
    // );
}

loadingModels();

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(40);

renderer.render(scene, camera);

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);
const controls = new OrbitControls(camera, renderer.domElement);

// animation loop
function animate() {
    requestAnimationFrame(animate);

    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / this.window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
