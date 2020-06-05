import './toolbar.scss';
import { Dialog } from '@/utils/dialog';
import { scene, control} from '@/global';
import { Vector3 } from 'three/build/three.min.js';
import util from '@/utils/index';
import utils from '../utils';

const searchTemp = `<div><label>柜列号</label><input type="text" class="search" value="A2"/>
                    <label>柜号</label><input type="text" class="search-item" value="C05"/></div>`;

function searchArchive() {
    Dialog.open(searchTemp, {
        title: '搜索档案',
        yes: (el) => {
            const cabinetNum = el.querySelector('.search').value;
            const cabinetItemNum = el.querySelector('.search-item').value;
            const obj = findCabintItem(cabinetNum, cabinetItemNum);
            if (!obj) {
                alert('未找到该档案柜');
                return;
            }
            // obj.blink();
            // control.saveState();
            // scene.updateMatrixWorld(true);
            // const pos = new Vector3();
            // obj.parent.getWorldPosition(pos);
            // control.target = pos;
            // control.update();
            // Dialog.close(el);

            const {x, y,z, rx, ry,rz} = obj.parent.params.cameraPos;
            obj.blink();
            scene.updateMatrixWorld(true);
            const pos = new Vector3();
            obj.parent.getWorldPosition(pos);
            util.setCameraPosition(pos, {rx: rx, ry: ry, rz: rz}, {px: x, py: y, pz: z});
            control.saveState();
            Dialog.close(el);
        },
    });
}

function resetCamera() {
    utils.resetCameraPosition();
    // const obj = util.getChildrenByName(scene, 'CabinetGroup');
    // obj.forEach((group) => {
    //     group.children.forEach((o) => {
    //         if (o.isCabinet) {
    //             o.material.color.set(0xc0c0c0);
    //             o.show();
    //             o.children.forEach((item) => {
    //                 if (item.isCabinetItem) {
    //                     item.material.transparent = true;
    //                     item.material.opacity = 0;
    //                 }
    //             });
    //         }
    //     });
    // });
}

function morenCamera() {
    control.reset();
}

function printInfo() {
    console.log(
        JSON.stringify({
            x: control.object.position.x,
            y: control.object.position.y,
            z: control.object.position.z,
            rx: control.object.rotation.x,
            ry: control.object.rotation.y,
            rz: control.object.rotation.z,
        })
    );
}

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

export default function () {
    // document.querySelector('.print-info').onclick = printInfo;
    document.querySelector('.moren-camera').onclick = morenCamera;
    document.querySelector('.reset-camera').onclick =resetCamera;
    document.querySelector('.search-archive').onclick = searchArchive;
}
