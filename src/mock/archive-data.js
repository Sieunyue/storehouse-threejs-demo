let startId = 225 + 1;
const position = [
    { x: 55, y: -119, z: 138, rx: 0.8210072321697538, ry: -0.6084920744746755, rz: 0.550550590426113 },
    { x: 11.888196897033069, y: -94.23828424568916, z: 117.1893723064145, rx: 0.9011511638432148, ry: -0.6365887596124442, rz: 0.6440653387262636 },
    { rx: 0.8968014445410765, ry: -0.6513709080196897, rz: 0.6492404845603497, x: -56.284167870698965, y: -100.1818240884629, z: 122.44985785247246 },
    { x: -95.671930563268, y: -75.69407344577982, z: 108.87449864103553, rx: 0.8323524328684804, ry: -0.6541399476993186, rz: 0.5892566758692547 },
    { x: -163.21668153900524, y: -73.84112389907745, z: 115.73909629519451, rx: 0.7491808371694133, ry: -0.6930521945929528, rz: 0.5361506639309663 },
    { x: 37.45689383207706, y: -146.02440759446176, z: 43.68707649870986, rx: 0.8744736627180449, ry: -0.5652763049496669, rz: 0.5698182418972093 },
    { x: -8.469786129591142, y: -103.33811700562444, z: 18.08882901481232, rx: 0.8057763885341049, ry: -0.6652908228338015, rz: 0.5714197406871958 },
    { x: -53.20636023530277, y: -81.33912834468504, z: 8.146752568130339, rx: 0.7164207114477047, ry: -0.6809019914818728, rz: 0.5014103669063323 },
    { x: -107.56999640650629, y: -83.39379126529747, z: -5.136849075533824, rx: 0.8415133850891603, ry: -0.6872150933973475, rz: 0.6173401810605921 },
    { x: -173.2062514876702, y: -83.33849088199386, z: 9.978041226631802, rx: 0.7197010506545354, ry: -0.6665747230342467, rz: 0.4966510527273451 },
];
function generateCabinetItem(col, row) {
    const ret = [];
    const t = 'ABCDEFGHIJKLMNOBQRSTUVWXYZ';
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            ret.push({ alias: t[i] + +'0' + (j + 1), uniqueId: startId++ });
        }
    }
    return ret;
}

function generateCabinetGroup(pre, k) {

    const arr = Array(5)
        .fill(0)
        .map((o, i) => {
            return {
                alias: pre + (i+1),
                uniqueId: startId++,
                cameraPos: position[k + i],
            };
        });

    return arr.map((o)=>{
        o.children= generateCabinetItem(6, 4);
        return o;
    })
}


const data = {
    alias: 'demo0',
    number: 5,
    uniqueId: startId++,
    children: generateCabinetGroup('A', 0),
};

const data1 = {
    alias: 'demo1',
    number: 5,
    uniqueId: startId++,
    children: generateCabinetGroup('B', 5),
};

export { data, data1 };
