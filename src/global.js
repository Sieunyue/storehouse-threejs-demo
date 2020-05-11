import {Scene, PerspectiveCamera, WebGLRenderer, PointLight} from 'three';

// three 三个基本元素，场景、相机和渲染器
const scene = new Scene();
const camera = new PerspectiveCamera( 1000, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new WebGLRenderer();

renderer.setClearColor(0xeeeeee, 1.0);
renderer.shadowMap.enabled = true; 
renderer.setSize( window.innerWidth, window.innerHeight );

camera.position.set(0,0,0);
camera.lookAt(0, 0, 0);
camera.position.z = 100;



export {scene, camera, renderer}