import './index.scss';
import '@/assets/iconfont/iconfont.css';
import {AxesHelper} from 'three';
import Stats from 'stats.js';
import TWEEN from '@tweenjs/tween.js'
import {scene, camera, renderer} from './global';
import {initThreeClickEvent} from '@/control/clickEvent';
import '@/control/toolbar.js';
import CabinetGroup from './component/CabinetGroup';
import {data} from '@/mock/archive-data';

// document.body.appendChild( renderer.domElement );

const cabinetGroup = new CabinetGroup(data);
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