import {AxesHelper, GridHelper} from 'three';
import Stats from 'stats.js';
import TWEEN from '@tweenjs/tween.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {scene, camera, renderer} from './global';
import {initThreeClickEvent} from './clickEvent';
import Store from './component/Store';
import CabinetGroup from './component/CabinetGroup';
import './index.scss';


document.body.appendChild( renderer.domElement );

// const object3D = new Object3D();
// const a1 = new Archive();
// const a2 = new Archive();
// a1.getMesh().position.set(15,0,0)
// a1.getMesh().material.shadowSide  = BackSide;
// object3D.add(a1.getMesh());
// object3D.add(a2.getMesh());

// scene.add(object3D);
// console.log(Floor)
// Floor();
// new Store(scene);
// new Cabinet(scene);
const cabinetGroup = new CabinetGroup();
cabinetGroup.rotateX(Math.PI/2)

scene.add(cabinetGroup);
// 鼠标控制
const control = new OrbitControls(camera,renderer.domElement);

const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

function animate() {
    stats.begin();
	stats.end();
    requestAnimationFrame( animate );
    TWEEN.update();
	renderer.render( scene, camera );
}
const axesHelper = new AxesHelper( 500 );
scene.add( axesHelper );
// const  gridHelper = new GridHelper( 500, 500 );
// scene.add( gridHelper );

animate();

initThreeClickEvent();