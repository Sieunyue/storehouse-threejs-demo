import './index.scss';
import '@/assets/iconfont/iconfont.css';
import Stats from 'stats.js';
import TWEEN from '@tweenjs/tween.js';
import CabinetGroup from './component/CabinetGroup';
import Store from '@/scene/Store';
import util from '@/utils/index';
import { AxesHelper } from 'three/build/three.min.js';
import { scene, camera, renderer } from './global';
import { initThreeClickEvent } from '@/control/clickEvent';
import { data, data1 } from '@/mock/archive-data';
import '@/control/toolbar.js';

// document.body.appendChild( renderer.domElement );

const cabinetGroup = new CabinetGroup(data);
const cabinetGroup1 = new CabinetGroup(data1);

cabinetGroup.rotateX(Math.PI / 2);
cabinetGroup.rotateZ(Math.PI / 2);
cabinetGroup1.rotateX(Math.PI / 2);
cabinetGroup1.rotateZ(Math.PI / 2);
cabinetGroup.position.set(140, -22, 60);
cabinetGroup1.position.set(140, -22, -60);

scene.add(cabinetGroup);
scene.add(cabinetGroup1);
scene.add(new Store());

// 帧数显示
const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

const axesHelper = new AxesHelper(500);
scene.add(axesHelper);
// const  gridHelper = new GridHelper( 500, 500 );
// scene.add( gridHelper );

animate();

initThreeClickEvent();

function animate() {
    stats.begin();
    stats.end();
    requestAnimationFrame(animate);
    TWEEN.update();
    renderer.render(scene, camera);
}

const uniqueId = util.getQueryParams('id');
if(uniqueId && uniqueId !== ''){
    const res =  util.findCabinetItemById(uniqueId);
    res.blink();
}


