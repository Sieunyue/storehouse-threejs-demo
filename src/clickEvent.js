import { Raycaster, Vector2 } from 'three';
import {renderer, camera} from './global'
const clickObjects=[];
const clickEventListen = {};

function initThreeClickEvent(mesh) {
    const raycaster = new Raycaster();
    const mouse = new Vector2();

    document.getElementsByTagName("canvas")[0].addEventListener('mousedown', onDocumentMouseDown, false);
    function onDocumentMouseDown(event) {
        event.preventDefault();
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(clickObjects);

        // if(intersects.length > 0) {
        //     console.log(intersects[0].object);
        //     intersects[0].object.clickEvent();
        // }
        intersects.forEach((o) => {
            ClickEvent.trigger('click', o.object);
        })

    }
}

function ClickEvent(){

}

ClickEvent.on = (event, mesh, callback)=>{
    clickObjects.push(mesh);
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