import {AxesHelper} from 'three';
import Stats from 'stats.js';
import TWEEN from '@tweenjs/tween.js'
import {scene, camera, renderer} from './global';
import {initThreeClickEvent} from './clickEvent';
// import Store from './component/Store';
import CabinetGroup from './component/CabinetGroup';
import './index.scss';

// document.body.appendChild( renderer.domElement );

const cabinetGroup = new CabinetGroup();
cabinetGroup.rotateX(Math.PI/2)

scene.add(cabinetGroup);

// 帧数显示
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