import { MeshLambertMaterial, Mesh, Group, DoubleSide, Geometry, Vector3, Vector2, Face3, TextureLoader } from 'three';
import Archive from './Archive';
import { cabinetItemConf } from '@/config';

const shellMaterial = new MeshLambertMaterial({
    side: DoubleSide,
    color:  0xd3d3d3,
    emissive: 0xd3d3d3
});

class CabinetItem extends Mesh {
    constructor(config) {
        super();
        const defaultConfig = {
            ...cabinetItemConf,
            origin: [0, 0],
            click: () => {},
            doubleClick: () => {},
        };
        this.config = Object.assign(defaultConfig, config);
        // this.cabinetItem = undefined;
        this.geometry = generateGeometry(this.config.width, this.config.depth, this.config.height);
        this.material = this.geometry.faces.map(()=>{
            return shellMaterial;
        })
        this.init();
    }

    async init() {
        const { width: w, height: h, depth: d } = this.config;
        // this.cabinetItem = drawShell(w, d, h);
        // this.add(this.cabinetItem);
        // this.position.set(posX, 0, posY);

        // 设置案卷位置原点
        const { origin } = this.config;
        origin[0] = w / 2;
        origin[1] = -h / 2;

        this.addArchive();
    }

    addArchive() {
        const [x, y] = this.config.origin;
        const num = Math.round(Math.random() * 20);
        for (let i = 0; i < num; i++) {
            const archive = new Archive();
            archive.position.set(x - i * archive.config.width - 0.5, 0, y + 5);
            this.add(archive);
        }
    }
}

// function drawShell(w, h, d) {
//     const geometry = generateGeometry(w, h, d);
//     const texture = new TextureLoader().load('../../public/static/c1.png');

//     const materials = [];
//     for (let i = 0; i < geometry.faces.length / 2; i++) {
//         materials.push(
//             new MeshLambertMaterial({
//                 side: DoubleSide,
//                 map: texture,
//             })
//         );
//     }
//     const mesh = new Mesh(geometry, materials);
//     return mesh;
// }

function generateGeometry(w, h, d) {
    const geometry = new Geometry();
    const v3 = [
        new Vector3(-w / 2, -h / 2, d / 2), //0
        new Vector3(w / 2, -h / 2, d / 2),
        new Vector3(w / 2, h / 2, d / 2),
        new Vector3(-w / 2, h / 2, d / 2),

        new Vector3(-w / 2, -h / 2, -d / 2), //4
        new Vector3(w / 2, -h / 2, -d / 2),
        new Vector3(w / 2, h / 2, -d / 2),
        new Vector3(-w / 2, h / 2, -d / 2),

        new Vector3(-w / 2 - 1, -h / 2, d / 2 + 1), //8
        new Vector3(w / 2 + 1, -h / 2, d / 2 + 1),
        new Vector3(w / 2 + 1, h / 2, d / 2 + 1),
        new Vector3(-w / 2 - 1, h / 2, d / 2 + 1),

        new Vector3(-w / 2 - 1, -h / 2, -d / 2 - 1), //12
        new Vector3(w / 2 + 1, -h / 2, -d / 2 - 1),
        new Vector3(w / 2 + 1, h / 2, -d / 2 - 1),
        new Vector3(-w / 2 - 1, h / 2, -d / 2 - 1),
    ];
    const faces = [
        new Face3(3, 0, 2),
        new Face3(0, 1, 2),
        new Face3(4, 5, 7),
        new Face3(5, 6, 7),
        new Face3(5, 6, 1),
        new Face3(6, 2, 1),
        new Face3(7, 4, 3),
        new Face3(4, 0, 3),

        // new Face3(3 + 8, 0 + 8, 2 + 8),
        // new Face3(0 + 8, 1 + 8, 2 + 8),
        // new Face3(4 + 8, 5 + 8, 7 + 8),
        // new Face3(5 + 8, 6 + 8, 7 + 8),
        // new Face3(5 + 8, 6 + 8, 1 + 8),
        // new Face3(6 + 8, 2 + 8, 1 + 8),
        // new Face3(7 + 8, 4 + 8, 3 + 8),
        // new Face3(4 + 8, 0 + 8, 3 + 8),

        // new Face3(0, 8, 12),
        // new Face3(0, 4, 12),
        // new Face3(1, 9, 13),
        // new Face3(1, 5, 13),
        // new Face3(4, 5, 12),
        // new Face3(5, 12, 13),
        // new Face3(0, 8, 9),
        // new Face3(0, 1, 9),

        // new Face3(3, 11, 15),
        // new Face3(3, 7, 15),
        // new Face3(2, 10, 14),
        // new Face3(2, 6, 14),
        // new Face3(7, 6, 15),
        // new Face3(6, 15, 14),
        // new Face3(3, 11, 10),
        // new Face3(3, 2, 10),
    ];

    geometry.vertices = v3;
    geometry.faces = faces;

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    const uv = [new Vector2(0, 0), new Vector2(1, 0), new Vector2(1, 1), new Vector2(0, 1)];
    for (let i = 0; i < geometry.faces.length; i += 2) {
        geometry.faceVertexUvs[0][i] = [uv[0], uv[1], uv[3]];
        geometry.faceVertexUvs[0][i + 1] = [uv[1], uv[2], uv[3]];
    }

    return geometry;
}
export default CabinetItem;
