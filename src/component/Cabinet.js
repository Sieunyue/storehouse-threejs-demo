import {
    MeshLambertMaterial,
    Mesh,
    DoubleSide,
    Geometry,
    Vector3,
    Vector2,
    FontLoader,
    Face3,
    TextGeometry,
    BoxGeometry,
} from 'three/build/three.min.js';
import { ClickEvent } from '../control/clickEvent';
import { cabinetConf } from '@/config';
import CabinetItem from './CabinetItem';
// import { scene, camera } from '../global';

const clapboardGeometry = new BoxGeometry(1, 1, 1);
const clapboardMaterial = new MeshLambertMaterial({
    side: DoubleSide,
    color: 0xc0c0c0,
});

const shellMaterial = new MeshLambertMaterial({
    side: DoubleSide,
    color: 0xc0c0c0,
    opacity: 0.1,
});
const shellGeometry = generateGeometry(cabinetConf.width, cabinetConf.depth, cabinetConf.height);

class Cabinet extends Mesh {
    constructor(config) {
        super();
        const defaultConf = {
            width: cabinetConf.width,
            height: cabinetConf.height,
            depth: cabinetConf.depth,
            row: cabinetConf.row,
            col: cabinetConf.col,
            lazy: true,
            doubleClick: () => {},
            click: () => {},
        };
        this.params = Object.assign(defaultConf, config);
        this.name = 'Cabinet';
        this.geometry = shellGeometry;
        this.material = shellMaterial.clone();
        this.isCabinet = true;
        this.init();
    }

    init() {
        const { width: w, height: h, depth: d, col, row } = this.params;
        const load = new FontLoader();
        const that = this;
        load.load('../../public/static/helvetiker_regular.typeface.json', function (font) {
            const textGeo = new TextGeometry(that.params.alias, {
                font: font,
                size: 6,
                height: 2,
            });
            const textmaterial = new MeshLambertMaterial({ side: DoubleSide, color: 0x0f4b69 });
            const textMesh = new Mesh(textGeo, textmaterial);
            textMesh.rotateZ(Math.PI / 2);
            textMesh.rotateX(Math.PI / 2);
            textMesh.position.set(w / 2, -6, 0);
            that.add(textMesh);
        });

        ClickEvent.on('click', this, (obj) => {
            if (this.uuid === obj.uuid) {
                this.params.click(this);
            }
        });

        ClickEvent.on('doubleClick', this, (obj) => {
            if (this.uuid === obj.uuid) {
                this.params.doubleClick(this);
            }
        });

        this.addCabinet(row, col);
    }

    setDoubleClickFunc(fn) {
        if (!(fn instanceof Function)) {
            return;
        }
        this.params.doubleClick = fn;
    }

    addCabinet(row, col) {
        const w = (this.params.width - (col - 1) - 0.02) / col,
            h = (this.params.height - (row - 1) - 0.02) / row;
        const startX = (this.params.width - w) / 2 - 0.01,
            startY = (this.params.height - h) / 2 - 0.01;
        CabinetItem.resetGeometry(w - 1, h - 1, this.params.depth);
        for (let i = 0; i < row; i++) {
            const posY = startY - i * (h + 1);
            for (let j = 0; j < col; j++) {
                const posX = startX - j * (w + 1);
                const item = new CabinetItem({
                    ...this.params.children[i * col + j],
                    width: w - 0.03,
                    height: h - 0.03,
                    lazy: this.params.lazy,
                    depth: this.params.depth,
                });
                item.position.set(posX - 0.1, 0, posY - 0.1);
                // item.updateMatrix();
                // this.geometry.merge(item.geometry, item.matrix);
                this.add(item);
                if (i === 0 && j !== 0) {
                    const board = drawClapboard(1, this.params.height - 0.2, this.params.depth, posX + w / 2 + 0.5, 0);
                    this.geometry.merge(board.geometry, board.matrix);
                }
            }
            if (i !== 0) {
                const board = drawClapboard(this.params.width - 0.2, 1, this.params.depth, 0, posY + h / 2 + 0.5);
                this.geometry.merge(board.geometry, board.matrix);
            }
        }
    }

    showArchive() {
        if (!this.params.lazy) {
            return;
        }
        this.children.forEach((item) => {
            if (item.isCabinetItem) {
                item.addArchive();
            }
        });
    }

    hideArchive() {
        if (!this.params.lazy) {
            return;
        }
        this.children.forEach((item) => {
            if (item.isCabinetItem) {
                item.removeArchive();
            }
        });
    }

    hide() {
        this.material.transparent = true;
        this.material.opacity = 0.1;

        this.children.forEach((item) => {
            if (item.isCabinetItem) {
                item.hide();
            }
        });
    }

    show() {
        this.material.transparent = false;
        this.material.opacity = 1;

        this.children.forEach((item) => {
            if (item.isCabinetItem) {
                item.show();
            }
        });
    }

    blink() {
        const oColor = this.material.color.clone();
        let count = 0;
        let timerId = setInterval(() => {
            if (count % 2 === 0) {
                this.material.color.set(0xff0000);
            } else {
                this.material.color.set(oColor);
            }
            count++;
            if (count === 8) {
                clearInterval(timerId);
            }
        }, 300);
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

        // new Face3(14, 15,10),
        // new Face3(15, 11, 10),
        // new Face3(12, 13, 8),
        // new Face3(13, 9, 8)
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
