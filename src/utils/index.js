import { scene } from '@/global';

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
const findCabinetItemByAlias = () => {
  
};

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
const utils = {
    findCabinetItemByAlias,
    findCabinetItemById,
    getChildrenByName,
    getQueryParams,
};

export default utils;
