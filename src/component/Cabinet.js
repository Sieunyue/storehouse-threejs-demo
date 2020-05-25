import { MeshLambertMaterial, Mesh, DoubleSide, Geometry, Vector3, Vector2, Face3, TextureLoader, BoxGeometry} from 'three';
// import { scene, camera } from '../global';
import { ClickEvent } from '../control/clickEvent';
import CabinetItem from './CabinetItem';
import { cabinetConf } from '@/config';

const clapboardGeometry = new BoxGeometry(1, 1, 1);
const clapboardMaterial = new MeshLambertMaterial({
    side: DoubleSide,
    color: 0xC0C0C0,
});

const shellMaterial = new MeshLambertMaterial({
    side: DoubleSide,
    color: 0x9DB4D2,
});

class Cabinet extends Mesh {
    constructor(config) {
        super();
        const defaultConf = {
            width: cabinetConf.width,
            height: cabinetConf.height,
            depth: cabinetConf.depth,
            row: cabinetConf.row,
            col: cabinetConf.col,
            doubleClick: (cabinet) => {
            },
            click: () => {},
        };
        this.config = Object.assign(defaultConf, config);
        this.name = config.name || '';
        this.geometry = generateGeometry(this.config.width, this.config.depth, this.config.height);
        this.material = shellMaterial.clone();
        this.init();
    }

    async init() {
        const { width: w, height: h, depth: d, col, row } = this.config;

        ClickEvent.on('click', this, (obj) => {
            if (this.uuid === obj.uuid) {
                this.config.click(this);
            }
        });

        ClickEvent.on('doubleClick', this, (obj) => {
            if (this.uuid === obj.uuid) {
                this.config.doubleClick(this);
            }
        });

        this.addCabinet(row, col);
    }

    setDoubleClickFunc(fn) {
        if (!(fn instanceof Function)) {
            return;
        }
        this.config.doubleClick = fn;
    }

    addCabinet(row, col) {
        const w = (this.config.width - (col - 1) - 0.02) / col,
            h = (this.config.height - (row - 1) - 0.02) / row;
        const startX = (this.config.width - w) / 2 - 0.01,
            startY = (this.config.height - h) / 2 - 0.01;

        for (let i = 0; i < row; i++) {
            const posY = startY - i * (h + 1);
            for (let j = 0; j < col; j++) {
                const posX = startX - j * (w + 1);
                const item = new CabinetItem({
                    ...this.config.children[i * col + j],
                    width: w - 0.03,
                    height: h - 0.03,
                    depth: this.config.depth,
                });
                item.position.set(posX - 0.01, 0, posY - 0.01);
                item.updateMatrix();
                this.add(item);
                if (i === 0 && j !== 0) {
                    const board = drawClapboard(1, this.config.height, this.config.depth, posX + w / 2 + 0.5, 0);
                    this.geometry.merge(board.geometry, board.matrix);
                }
            }
            if (i !== 0) {
                const board = drawClapboard(this.config.width, 1, this.config.depth, 0, posY + h / 2 + 0.5);
                this.geometry.merge(board.geometry, board.matrix);
            }
        }
    }
}

function drawClapboard(w, h, d, posX, posY) {
    const mesh = new Mesh(clapboardGeometry, clapboardMaterial);
    mesh.scale.set(w, d, h);
    mesh.position.set(posX, 0, posY);
    mesh.name = 'clapboard';
    mesh.updateMatrix();
    return mesh;
}

// function drawShell(w, h, d) {
//     const geometry = generateGeometry(w, h, d);
//     // const texture = new TextureLoader().load('../../public/static/c1.png');

//     const materials = [];
//     for (let i = 0; i < geometry.faces.length / 2; i++) {
//         materials.push(
//             new MeshLambertMaterial({
//                 side: DoubleSide,
//                 // map: texture,
//                 color: 0x00ffff,
//                 // shininess: 12,
//                 // emissive: 0x696969,
//             })
//         );
//     }
//     const mesh = new Mesh(geometry, materials);
//     console.log(mesh);
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

        new Face3(3 + 8, 0 + 8, 2 + 8),
        new Face3(0 + 8, 1 + 8, 2 + 8),
        new Face3(4 + 8, 5 + 8, 7 + 8),
        new Face3(5 + 8, 6 + 8, 7 + 8),
        new Face3(5 + 8, 6 + 8, 1 + 8),
        new Face3(6 + 8, 2 + 8, 1 + 8),
        new Face3(7 + 8, 4 + 8, 3 + 8),
        new Face3(4 + 8, 0 + 8, 3 + 8),

        new Face3(12, 4, 8),
        new Face3(4, 0, 8),
        new Face3(5, 13, 1),
        new Face3(13, 9, 1),
        new Face3(12, 13, 4),
        new Face3(13, 5, 4),
        new Face3(0, 1, 8),
        new Face3(1, 9, 8),

        new Face3(7, 15, 3),
        new Face3(15, 11, 3),
        new Face3(14, 6, 10),
        new Face3(6, 2, 10),
        new Face3(14, 15, 6),
        new Face3(15, 7, 6),
        new Face3(2, 3, 10),
        new Face3(3, 11, 10),
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

export default Cabinet;
