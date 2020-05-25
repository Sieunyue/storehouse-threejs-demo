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
    name: 'demo',
    number: 3,
    children: [
        { name: 'A1', children: generateCabinetItem(6, 4) },
        { name: 'A2', children: generateCabinetItem(6, 4) },
        { name: 'A3', children: generateCabinetItem(6, 4) },
        { name: 'A4', children: generateCabinetItem(6, 4) },
        { name: 'A5', children: generateCabinetItem(6, 4) },
    ],
};

export { data };
