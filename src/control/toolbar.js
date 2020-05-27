import './toolbar.scss';
import { Dialog } from '@/utils/dialog';
import { scene, control, camera, renderer } from '@/global';
import { Vector2, Vector3, Raycaster, Ray } from 'three/build/three.min.js';
import { ClickEvent } from '@/control/clickEvent';

const searchTemp = `<div><label>柜列号</label><input type="text" class="search" value="A2"/>
                    <label>柜号</label><input type="text" class="search-item" value="CD5"/></div>`;

document.querySelector('.search-archive').onclick = () => {
    Dialog.open(searchTemp, {
        title: '搜索档案',
        yes: (el) => {
            const cabinetNum = el.querySelector('.search').value;
            const cabinetItemNum = el.querySelector('.search-item').value;
            let layObjs = [];
            try {
                let obj = null;
                for (let i = 0; i < 4; i++) {
                    try {
                        obj = scene
                            .getObjectByName('demo' + i)
                            .getObjectByName(cabinetNum)
                            .getObjectByName(cabinetItemNum);
                        layObjs = layObjs.concat(scene.getObjectByName('demo' + i).children);
                    } catch (e) {
                        console.log('');
                    }
                }
                const wv3 = new Vector3();
                obj.getWorldPosition(wv3);
                const { x, y } = wv3.project(camera);
                const wv2 = new Vector2(x, y);
                const ray = new Raycaster();
                ray.setFromCamera(wv2, camera);

                const intersects = ray.intersectObjects(layObjs);
                for (let i = 0; i < intersects.length; i++) {
                    const o = intersects[i].object;
                    if (o.getObjectByProperty('uuid', obj.uuid)) {
                        o.parent.openCabinet(o);
                    } else {
                        o.hide();
                    }
                }
                obj.material.transparent = false;
                obj.material.opacity = 1;

                let count = 0;
                let timerId = setInterval(() => {
                    if (count % 2 === 0) {
                        obj.parent.material.color.set(0xff0000);
                    } else {
                        obj.parent.material.color.set(0xc0c0c0);
                    }
                    count++;
                    if (count === 8) {
                        clearInterval(timerId);
                    }
                }, 300);
                control.saveState();
                control.target = obj.getWorldPosition();
                control.update();
                Dialog.close(el);
            } catch (e) {
                console.log(e)
                alert('未找到该档案柜');
            }
        },
    });
};

document.querySelector('.reset-camera').onclick = () => {
    control.reset();
    for (let i = 0; i < 4; i++) {
        const obj = scene.getObjectByName('demo' + i);
        obj.children.forEach((o)=>{
            if(o.isCabinet){
                o.material.color.set(0xc0c0c0);
                o.show();
                o.children.forEach((item)=>{
                    if(item.isCabinetItem){
                        item.material.transparent = true;
                        item.material.opacity = 0;
                    }
                })
            }
        })

    }
};

document.querySelector('.print-info').onclick = () => {
    renderer.info.reset();
};
