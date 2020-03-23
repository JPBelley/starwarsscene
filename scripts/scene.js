
var container;

var camera, scene, renderer;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var object;

import * as THREE from 'https://jpbelley.github.io/starwarsscene/build/three.module.js';

import { OBJLoader } from 'https://jpbelley.github.io/starwarsscene/jsm/loaders/OBJLoader.js';

function init() {

  container = document.getElementById('scene');

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.x = + 100;
  camera.position.z = 100;

  // scene
  scene = new THREE.Scene();

  var ambientLight = new THREE.AmbientLight(0xcccccc, 0.50);
  scene.add(ambientLight);

  // create a sphere
  var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  var sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0xdddddd,
  });
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(-600, -975, 200);
  sphere.scale.x = + 250;
  sphere.scale.y = + 250;
  sphere.scale.z = + 250;
  scene.add(sphere);

  // Spolight
  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(-40, 40, -15);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
  spotLight.shadow.camera.far = 130;
  spotLight.shadow.camera.near = 40;

  scene.add(spotLight);


  scene.add(camera);

  // manager

  function loadModel() {

    object.traverse(function (node) {

      if (node.material) {
        //This doesn't work. How can I apply material for loaded obj?
        var material = new THREE.MeshLambertMaterial({ color: 0x333333 });
        if (node instanceof THREE.Mesh) {
          node.material = material;
        }
      }

    });

    object.position.y = - 95;
    object.position.z = + 225;
    object.scale.x = + 10;
    object.scale.y = + 10;
    object.scale.z = + 10;
    scene.add(object);

  }

  var manager = new THREE.LoadingManager(loadModel);

  manager.onProgress = function (item, loaded, total) {

    console.log(item, loaded, total);

  };

  // texture

  var textureLoader = new THREE.TextureLoader(manager);

  var texture = textureLoader.load('textures/uv_grid_opengl.jpg');

  // model

  function onProgress(xhr) {

    if (xhr.lengthComputable) {

      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log('model ' + Math.round(percentComplete, 2) + '% downloaded');

    }

  }

  function onError() { }

  var loader = new OBJLoader(manager);

  loader.load('obj/x_wing.obj', function (obj) {

    object = obj;

  }, onProgress, onError);

  //

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  document.addEventListener('mousemove', onDocumentMouseMove, false);

  //

  window.addEventListener('resize', onWindowResize, false);

  function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

  }

  function onDocumentMouseMove(event) {

    mouseX = (event.clientX - windowHalfX) / 8;
    mouseY = (event.clientY - windowHalfY) / 8;

  }

  //

  function animate() {

    requestAnimationFrame(animate);
    render();

  }

  function render() {

    camera.position.x += (mouseX - camera.position.x) * .015;
    camera.position.y += (- mouseY - camera.position.y) * .015;

    if (object) camera.lookAt(object.position);

    renderer.render(scene, camera);

  }

  animate();
}
init();