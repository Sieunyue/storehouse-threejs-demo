import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {scene, camera, renderer} from './global';
import {initThreeClickEvent} from './clickEvent';
import Archive from './component/Archive';
import Store from './component/Store';
import './index.scss';
import {Object3D, BackSide} from 'three'

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
new Store(scene);
// 鼠标控制
const control = new OrbitControls(camera,renderer.domElement);

function animate() {
    requestAnimationFrame( animate );
	renderer.render( scene, camera );
}



animate();

initThreeClickEvent();