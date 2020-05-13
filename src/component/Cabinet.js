import { BoxGeometry, MeshLambertMaterial, Mesh, Group, DoubleSide, Geometry, Vector3, Face3 } from 'three';
import { ClickEvent } from '../clickEvent';
// import {ClickEvent} from '../clickEvent';



class Cabinet extends Group {
    constructor(config) {
        super();
        const defaultConfig = {
            width: 70,
            height: 40,
            depth: 20,
            click: ()=>{}
        };
        this.config = Object.assign(defaultConfig, config);
        this.cabinet = undefined;
        this.init();

        ClickEvent.on('click', this.cabinet, (obj) => {
            if(this.cabinet.uuid === obj.uuid){
                this.config.click(this);
            }
        });
    }

    init() {
        const { width: w, height: h, depth: d } = this.config;
        this.cabinet = drawShell( w, d, h);
        this.add(this.cabinet);
        this.position.set(0, 0, h/2+1); 
    }
}

function drawShell(w, h, d) {
    const geometry = generateGeometry(w, h, d);
    const material = new MeshLambertMaterial({
        side: DoubleSide,
        color: '#FDFDFD',
    });
    return (new Mesh(geometry, material))
}

function generateGeometry(w, h, d){
    const geometry = new Geometry();
    const v3 = [
        new Vector3(-w / 2, -h / 2, d / 2),
        new Vector3(w / 2, -h / 2, d / 2),
        new Vector3(w / 2, h / 2, d / 2),
        new Vector3(-w / 2, h / 2, d / 2),

        new Vector3(-w / 2, -h / 2, -d / 2),
        new Vector3(w / 2, -h / 2, -d / 2),
        new Vector3(w / 2, h / 2, -d / 2),
        new Vector3(-w / 2, h / 2, -d / 2),
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
