import {
    MeshLambertMaterial,
    Mesh,
    Group,
    DoubleSide,
    Geometry,
    Vector3,
    Face3,
    TextureLoader,
    RepeatWrapping,
} from 'three';
import { ClickEvent } from '../clickEvent';
// import {ClickEvent} from '../clickEvent';

class Cabinet extends Group {
    constructor(config) {
        super();
        const defaultConfig = {
            width: 70,
            height: 40,
            depth: 10,
            click: () => {},
            doubleClick: () => {},
        };
        this.config = Object.assign(defaultConfig, config);
        this.cabinet = undefined;
        this.init();
    }

    async init() {
        const { width: w, height: h, depth: d } = this.config;
        this.cabinet = drawShell(w, d, h);
        this.add(this.cabinet);
        this.position.set(0, 0, h / 2 + 1);

        ClickEvent.on('click', this.cabinet, (obj) => {
            if (this.cabinet.uuid === obj.uuid) {
                this.config.click(this);
            }
        });

        ClickEvent.on('doubleClick', this.cabinet, (obj) => {
            if (this.cabinet.uuid === obj.uuid) {
                this.config.doubleClick(this);
            }
        });


    }

    setDoubleClickFunc(fn) {
        if (!fn instanceof Function) {
            return;
        }
        this.config.doubleClick = fn;
    }
}

 function drawShell(w, h, d) {
    const geometry = generateGeometry(w, h, d);
    const material = new MeshLambertMaterial({
        side: DoubleSide,
        color: '#E9E7E3',
    });
    // const loader = new TextureLoader();

    // return new Promise((resolve, reject) => {
    //     loader.load('../../public/static/floor.png', (texture) => {
    //         texture.wrapS = texture.wrapT = RepeatWrapping;
    //         texture.repeat.set(1, 1);
    //         const material = new MeshLambertMaterial({
    //             side: DoubleSide,
    //             // color: '#D2D3D5'
    //             map: texture
    //         });

    //         const mesh = new Mesh(geometry, material);

    //         resolve(mesh);
    //     });
    // });
    return new Mesh(geometry, material);
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
        new Face3(0, 1, 2),
        new Face3(0, 2, 3),
        new Face3(4, 5, 6),
        new Face3(4, 6, 7),
        new Face3(1, 2, 6),
        new Face3(1, 5, 6),
        new Face3(0, 3, 4),
        new Face3(3, 4, 7),

        new Face3(0 + 8, 1 + 8, 2 + 8),
        new Face3(0 + 8, 2 + 8, 3 + 8),
        new Face3(4 + 8, 5 + 8, 6 + 8),
        new Face3(4 + 8, 6 + 8, 7 + 8),
        new Face3(1 + 8, 2 + 8, 6 + 8),
        new Face3(1 + 8, 5 + 8, 6 + 8),
        new Face3(0 + 8, 3 + 8, 4 + 8),
        new Face3(3 + 8, 4 + 8, 7 + 8),

        new Face3(0, 8, 12),
        new Face3(0, 4, 12),
        new Face3(1, 9, 13),
        new Face3(1, 5, 13),
        new Face3(4, 5, 12),
        new Face3(5, 12, 13),
        new Face3(0, 8, 9),
        new Face3(0, 1, 9),

        new Face3(3, 11, 15),
        new Face3(3, 7, 15),
        new Face3(2, 10, 14),
        new Face3(2, 6, 14),
        new Face3(7, 6, 15),
        new Face3(6, 15, 14),
        new Face3(3, 11, 10),
        new Face3(3, 2, 10),
    ];

    geometry.vertices = v3;
    geometry.faces = faces;

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    return geometry;
}

// function drawShell(w, h, d, x, y, z) {
//     const gemotery = new BoxGeometry(w, h, d);
//     const mesh = new Mesh(gemotery, material);
//     mesh.position.set(x, y, z);
//     return mesh;
// }

export default Cabinet;
