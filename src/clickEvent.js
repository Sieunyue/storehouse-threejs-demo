import { Raycaster, Vector2 } from 'three';
import {renderer, camera, scene} from './global'
const clickObjects=[];
const clickEventListen = {};

const raycaster = new Raycaster();
const mouse = new Vector2();

function initThreeClickEvent(mesh) {
    

    document.getElementsByTagName("canvas")[0].addEventListener('click', onDocumentMouseDown, false);
    
    
}

function onDocumentMouseDown(event) {
    event.preventDefault();
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(clickObjects)
    // const intersects = raycaster.intersectObjects(scene.children);
    if(intersects.length > 0) {
        // console.log(intersects[0].object);
        // intersects[0].object.clickEvent();
        ClickEvent.trigger('click', intersects[0].object);
    }
    // intersects.forEach((o) => {
    //     ClickEvent.trigger('click', o.object);
    // })

}

function ClickEvent(){}

ClickEvent.on = (event, mesh, callback)=>{
    if(mesh.type === 'Group'){
       
        mesh.children.forEach((o)=>{
            clickObjects.push(o);
        })
    }else{
        clickObjects.push(mesh);
    }


    if(clickEventListen[event]){
        clickEventListen[event].push(callback);
    }else{
        clickEventListen[event] = [callback];
    }
}

ClickEvent.trigger = (event,  ...arg)=>{
    if(clickEventListen[event]){
        clickEventListen[event].forEach((fn)=>{
            fn(...arg);
        })
    }
}

// function addClickEvent(mesh){
//     clickObjects.push(mesh);
// }
export {
    initThreeClickEvent,
    ClickEvent,
}