import {Scene, PerspectiveCamera, WebGLRenderer, AmbientLight} from 'three';

// three 三个基本元素，场景、相机和渲染器
const scene = new Scene();
const camera = new PerspectiveCamera( 1000, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new WebGLRenderer();

renderer.setClearColor(0xeeeeee, 1.0);
renderer.shadowMap.enabled = true; 
renderer.setSize( window.innerWidth, window.innerHeight );


camera.position.set(0,-200,200);
camera.lookAt(0,0,0);

// camera.position.z = 100;


const light1 = new AmbientLight(0xffffff);
    //设置灯光的位置
    light1.position.set( 1000 , 1000 , 1000 );
    //将灯光加入场景
    scene.add( light1 );

export {scene, camera, renderer}