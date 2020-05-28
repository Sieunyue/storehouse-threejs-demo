let startId = 225 +1;
function generateCabinetItem(col, row) {
    const ret = [];
    const t = 'ABCDEFGHIJKLMNOBQRSTUVWXYZ';
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            ret.push({ alias: t[i] + +'0'+(j+1), uniqueId: startId++ });
        }
    }
    return ret;
}

function generateCabinetGroup(pre){
    return Array(5).fill(0).map((o, i)=>{
        return {
            alias: pre+i,
            uniqueId: startId++,
            children: generateCabinetItem(6,4)
        }
    })
}

const data = {
    alias: 'demo0',
    number: 5,
    children: generateCabinetGroup('A'),
};

const data1 = {
    alias: 'demo1',
    number: 5,
    children: generateCabinetGroup('B'),
};


export { data, data1};
