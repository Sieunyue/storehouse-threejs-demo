import { Scene, PerspectiveCamera, WebGLRenderer, PointLight, AmbientLight } from 'three/build/three.min.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { globalConfig } from '@/config';

// three 三个基本元素，场景、相机和渲染器

const camera = new PerspectiveCamera(1000, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new WebGLRenderer({
    canvas: document.querySelector('#demo'),
    antialias: true,
});

renderer.setClearColor(globalConfig.backgroundColor, 1.0);
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.set(0, -200, 200);
camera.lookAt(0, 0, 0);

// 鼠标控制
// eslint-disable-next-line
const control = new OrbitControls(camera, renderer.domElement);

const scene = new Scene();
const light1 = new PointLight(0xffffff);

const light2 = new AmbientLight(0xffffff, 0.5);

light1.position.set(0, -500, 0);

scene.add(light1);
scene.add(light2);

export { scene, camera, renderer, control };
