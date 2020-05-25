import { MeshBasicMaterial, Mesh, Group, DoubleSide, Geometry, Vector3, Vector2, Face3, TextureLoader } from 'three';
import Archive from './Archive';
import { cabinetItemConf } from '@/config';

const shellMaterial = new MeshBasicMaterial({
    side: DoubleSide,
    color: 0xd3d3d3,
    emissive: 0xd3d3d3,
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
        this.name = config.name || '';
        this.geometry = generateGeometry(this.config.width, this.config.depth, this.config.height);
        this.material = shellMaterial.clone();
        this.init();
    }

    async init() {
        const { width: w, height: h, depth: d } = this.config;
        // this.cabinetItem = drawShell(w, d, h);
        // this.add(this.cabinetItem);
        // this.position.set(posX, 0, posY);

        // 设置案卷位置原点
        const { origin } = this.config;
        origin[0] = w / 2 - 0.51;
        origin[1] = -h / 2;

        this.addArchive();
    }

    addArchive() {
        const [x, y] = this.config.origin;
        const num = Math.round(Math.random() * 20);
        for (let i = 0; i < num; i++) {
            const archive = new Archive();
            archive.position.set(x - (i * (archive.config.width+.1)+1), 0, y + 5);
            this.add(archive);
        }
    }
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
