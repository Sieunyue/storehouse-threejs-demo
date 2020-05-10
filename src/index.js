import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {scene, camera, renderer} from './global';
import {initThreeClickEvent} from './clickEvent';
import Archive from './component/Archive';
import './index.scss';
import {Object3D} from 'three'

document.body.appendChild( renderer.domElement );

var object3D = new Object3D();
object3D.add(new Archive().getMesh());
object3D.add(new Archive().getMesh());

scene.add(object3D);

// 鼠标控制
const control = new OrbitControls(camera,renderer.domElement);

function animate() {
    requestAnimationFrame( animate );
	renderer.render( scene, camera );
}



animate();

initThreeClickEvent();