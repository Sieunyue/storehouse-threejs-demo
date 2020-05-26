function generateCabinet(num) {
    let ret = [];
    for (let i = 0; i < num; i++) {
        ret.push({
            name: 'A' + (i + 1),
        });
    }
    return ret;
}
function generateCabinetItem(col, row) {
    const ret = [];
    const t = 'ABCDEFGHIJKLMNOBQRSTUVWXYZ';
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            ret.push({ name: 'C'+t[i] + j });
        }
    }
    return ret;
}

const cabinet = generateCabinet(5);
const data = {
    name: 'demo0',
    number: 5,
    children: [
        { name: 'A1', children: generateCabinetItem(6, 4) },
        { name: 'A2', children: generateCabinetItem(6, 4) },
        { name: 'A3', children: generateCabinetItem(6, 4) },
        { name: 'A4', children: generateCabinetItem(6, 4) },
        { name: 'A5', children: generateCabinetItem(6, 4) },
    ],
};

const data1 = {
    name: 'demo1',
    number: 5,
    children: [
        { name: 'B1', children: generateCabinetItem(6, 4) },
        { name: 'B2', children: generateCabinetItem(6, 4) },
        { name: 'B3', children: generateCabinetItem(6, 4) },
        { name: 'B4', children: generateCabinetItem(6, 4) },
        { name: 'B5', children: generateCabinetItem(6, 4) },
    ],
};

const data2 = {
    name: 'demo2',
    number: 3,
    children: [
        { name: 'C1', children: generateCabinetItem(6, 4) },
        { name: 'C2', children: generateCabinetItem(6, 4) },
        { name: 'C3', children: generateCabinetItem(6, 4) },
    ],
};

const data3 = {
    name: 'demo3',
    number: 4,
    children: [
        { name: 'D1', children: generateCabinetItem(6, 4) },
        { name: 'D2', children: generateCabinetItem(6, 4) },
        { name: 'D3', children: generateCabinetItem(6, 4) },
        { name: 'D4', children: generateCabinetItem(6, 4) },
    ],
};

export { data, data1, data2, data3 };
