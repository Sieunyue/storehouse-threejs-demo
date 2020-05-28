import './toolbar.scss';
import { Dialog } from '@/utils/dialog';
import { scene, control, renderer } from '@/global';
import { Vector3 } from 'three/build/three.min.js';
import util from '@/utils/index';

const searchTemp = `<div><label>柜列号</label><input type="text" class="search" value="A2"/>
                    <label>柜号</label><input type="text" class="search-item" value="C05"/></div>`;

document.querySelector('.search-archive').onclick = () => {
    Dialog.open(searchTemp, {
        title: '搜索档案',
        yes: (el) => {
            const cabinetNum = el.querySelector('.search').value;
            const cabinetItemNum = el.querySelector('.search-item').value;
            
            const obj = findCabintItem(cabinetNum, cabinetItemNum);
            if(!obj){
                alert('未找到该档案柜');
                return;
            }

            obj.blink();
            control.saveState();
            scene.updateMatrixWorld(true);
            const pos = new Vector3();
            obj.parent.getWorldPosition(pos);
            control.target = pos;
            control.update();
            Dialog.close(el);
        },
    });
};

document.querySelector('.reset-camera').onclick = () => {
    control.reset();

    const obj = util.getChildrenByName(scene, 'CabinetGroup');
    obj.forEach((group) => {
        group.children.forEach((o) => {
            if (o.isCabinet) {
                o.material.color.set(0xc0c0c0);
                o.show();
                o.children.forEach((item) => {
                    if (item.isCabinetItem) {
                        item.material.transparent = true;
                        item.material.opacity = 0;
                    }
                });
            }
        });
    });
};

document.querySelector('.print-info').onclick = () => {
    renderer.info.reset();
};

function findCabintItem(cNum, ciNum) {
    const groupList = util.getChildrenByName(scene, 'CabinetGroup');
    for (let i = 0; i < groupList.length; i++) {
        const cList = util.getChildrenByName(groupList[i], 'Cabinet');
        for (let k = 0; k < cList.length; k++) {
            if (cList[k].params.alias !== cNum) {
                continue;
            } else {
                const itemList = util.getChildrenByName(cList[k], 'CabinetItem');
                for (let j = 0; j < itemList.length; j++) {
                    if (itemList[j].params.alias === ciNum) {
                        return itemList[j];
                    }
                }
            }
        }
    }
}
