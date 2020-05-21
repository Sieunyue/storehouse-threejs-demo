import { Scene, PerspectiveCamera, WebGLRenderer, DirectionalLight, AmbientLight } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// three 三个基本元素，场景、相机和渲染器
const scene = new Scene();
const camera = new PerspectiveCamera(1000, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new WebGLRenderer({
    canvas: document.querySelector('#demo'),
});

renderer.setClearColor(0xf0f0f0, 1.0);
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.set(0, -200, 200);
camera.lookAt(0, 0, 0);

// 鼠标控制
// eslint-disable-next-line
const control = new OrbitControls(camera, renderer.domElement);

const light1 = new DirectionalLight(0xffffff);
const light2 = new AmbientLight(0x000000);
//设置灯光的位置
light1.position.set(0, -200, 0);
//将灯光加入场景
scene.add(light1);
scene.add(light2);

// const g = new BoxGeometry(20, 20, 20);
// const m = new MeshStandardMaterial({
//     color: '#2194ce',
//     roughness: 0.5,
//     metalness: 0.5,
//     // shininess: 10,
//     // shading: FlatShading,
//     // // specular: new Color('rgb(220,76,65)'),
//     // emissive: new Color('rgb(6,53,53)'),
// });
// scene.add(new Mesh(g, m));

export { scene, camera, renderer };
