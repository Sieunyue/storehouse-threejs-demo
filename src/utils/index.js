import { scene, control } from '@/global';
import { Vector3 } from 'three/build/three.min.js';
// import { globalConfig } from '@/config';

const findCabinetItemById = (id) => {
    const groupList = getChildrenByName(scene, 'CabinetGroup');
    for (let i = 0; i < groupList.length; i++) {
        const cList = getChildrenByName(groupList[i], 'Cabinet');
        for (let k = 0; k < cList.length; k++) {
            const itemList = getChildrenByName(cList[k], 'CabinetItem');
            for (let j = 0; j < itemList.length; j++) {
                if (itemList[j].params.uniqueId === parseInt(id)) {
                    return itemList[j];
                }
            }
        }
    }
    return undefined;
};
const findCabinetItemByAlias = () => {};

const getChildrenByName = (parent, name) => {
    return parent.children.filter((o) => {
        return o.name === name;
    });
};
const getQueryParams = (str) => {
    const query = window.location.search.substring(1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        if (pair[0] == str) {
            return pair[1];
        }
    }
    return undefined;
};

const resetCameraPosition = () => {
    setCameraPosition(
        new Vector3(0, 0, 0),
        { rx: 0, ry: 0, rz: 0 },
        { px: config.globalConfig.cameraPosition.x, py: config.globalConfig.cameraPosition.y, pz: config.globalConfig.cameraPosition.z },
        1
    );
};

const setCameraPosition = (target, rotation, position, zoom) => {
    control.target = target;
    const { rx = 0, ry = 0, rz = 0 } = rotation;
    control.object.rotation.set(rx, ry, rz);
    const { px, py, pz } = position;
    control.object.position.set(px, py, pz);
    control.object.zoom = zoom || 1;
    control.object.updateProjectionMatrix();
    control.update();
};

const utils = {
    findCabinetItemByAlias,
    findCabinetItemById,
    getChildrenByName,
    getQueryParams,
    resetCameraPosition,
    setCameraPosition,
};

export default utils;
