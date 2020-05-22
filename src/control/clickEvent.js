import { Raycaster, Vector2 } from 'three';
import { renderer, camera } from '@/global';
const clickObjects = [];
const clickEventListen = {};
const raycaster = new Raycaster();
const mouse = new Vector2();

let timerId = 0;

function initThreeClickEvent() {
    document.getElementsByTagName('canvas')[0].addEventListener('click', onDocumentMouseDown, false);
}

function onDocumentMouseDown(event) {
    event.preventDefault();
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(clickObjects);
    // const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        if (timerId === 0) {
            timerId = setTimeout(() => {
                timerId = 0;
                ClickEvent.trigger('click', intersects[0].object);
            }, 250);
        } else {
            clearTimeout(timerId);
            timerId = 0;
            ClickEvent.trigger('doubleClick', intersects[0].object);
        }
    }
}

function ClickEvent() {}

ClickEvent.on = (event, mesh, callback) => {
    if (mesh.type === 'Group') {
        mesh.children.forEach((o) => {
            clickObjects.push(o);
        });
    } else {
        if (isOnClickList(mesh) === false) {
            clickObjects.push(mesh);
        }
    }

    if (clickEventListen[event]) {
        if (isOnEventList(event, mesh) !== false) {
            return;
        }
        clickEventListen[event].push([mesh.uuid, callback]);
    } else {
        clickEventListen[event] = [[mesh.uuid, callback]];
    }
};

ClickEvent.trigger = (event, ...arg) => {
    if (clickEventListen[event]) {
        clickEventListen[event].forEach((arr) => {
            arr[1](...arg);
        });
    }
};

ClickEvent.off = (mesh, event) => {
    // for(let i = 0; i < clickObjects.length; i++){
    //     if(clickObjects[i].uuid === mesh.uuid){
    //         clickObjects.splice(i, 1);
    //         break;
    //     }
    // }
    let index = isOnClickList(mesh);
    if (index !== false) {
        clickObjects.splice(index, 1);
    }

    if (event) {
        index = isOnEventList(event, mesh);
        if (index !== false) {
            clickEventListen[event].splice(index, 1);
        }
    } else {
        for (let key in clickEventListen) {
            index = isOnEventList(key, mesh);
            if (index !== false) {
                clickEventListen[key].splice(index, 1);
            }
        }
    }
};

function isOnClickList(mesh) {
    for (let i = 0; i < clickObjects.length; i++) {
        if (clickObjects[i].uuid === mesh.uuid) {
            return i;
        }
    }
    return false;
}

function isOnEventList(event, mesh) {
    const list = clickEventListen[event];
    for (let i = 0; i < list.length; i++) {
        if (list[i][0] === mesh.uuid) {
            return i;
        }
    }
    return false;
}

// function addClickEvent(mesh){
//     clickObjects.push(mesh);
// }
export { initThreeClickEvent, ClickEvent };
