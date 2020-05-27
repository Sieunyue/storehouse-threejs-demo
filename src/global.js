import { Scene, PerspectiveCamera, WebGLRenderer, PointLight, AmbientLight } from 'three/build/three.min.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// three 三个基本元素，场景、相机和渲染器

const camera = new PerspectiveCamera(1000, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new WebGLRenderer({
    canvas: document.querySelector('#demo'),
    // logarithmicDepthBuffer:true,
});

renderer.setClearColor(0x01031C, 1.0);
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.set(0, -200, 200);
camera.lookAt(0, 0, 0);

// 鼠标控制
// eslint-disable-next-line
const control = new OrbitControls(camera, renderer.domElement);

const scene = new Scene();
const light1 = new PointLight(0xffffff);
// const light2 = new DirectionalLight(0xffffff);
const light2 = new AmbientLight(0xffffff, .5);
//设置灯光的位置
// light1.position.set(0, -500, 0);
light1.position.set(0, -500, 0);
//将灯光加入场景5
scene.add(light1);
scene.add(light2);
// scene.add(light2);

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

export { scene, camera, renderer, control };
