import {Scene, PerspectiveCamera, WebGLRenderer, Raycaster, Vector2} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Archive from './archive'
import './index.scss'

// three 三个基本元素，场景、相机和渲染器
const scene = new Scene();
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new WebGLRenderer();

renderer.setClearColor(0xeeeeee, 1.0);
renderer.shadowMap.enabled = true; 
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.set(0,0,100);
camera.lookAt(0, 0, 0);

const archive = new Archive()
scene.add( archive.getMesh());

camera.position.z = 5;

// 鼠标控制
const control = new OrbitControls(camera,renderer.domElement);

function animate() {
    requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

var clickObjects=[];
clickObjects.push(archive.getMesh());
function initThreeClickEvent() {
    //点击射线
    var raycaster = new Raycaster();
    var mouse = new Vector2();
    document.getElementBy("container").addEventListener('mousedown', onDocumentMouseDown, false);
    function onDocumentMouseDown(event) {
        event.preventDefault();
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        //总结一下，这里必须装网格，mesh，装入组是没有效果的
        //所以我们将所有的盒子的网格放入对象就可以了
        // 需要被监听的对象要存储在clickObjects中。
        var intersects = raycaster.intersectObjects(clickObjects);

        // console.log(intersects)
        if(intersects.length > 0) {
            // 在这里填写点击代码
            console.log("dianji");
            console.log(intersects[0].object)
            showDetailPage(intersects[0].object.name);

        }

    }
}
initThreeClickEvent();
animate();