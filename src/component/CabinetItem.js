import { MeshBasicMaterial, Mesh,  Geometry, Vector3, Vector2, Face3} from 'three/build/three.min.js';
import Archive from './Archive';
// import { cabinetItemConf } from '@/config';
const {cabinetItemConf} = config;

const shellMaterial = new MeshBasicMaterial({
    color: 0xff0000,
    transparent: true,
    opacity: 0,
});

let shellGeometry = generateGeometry(1, 1, 1);

class CabinetItem extends Mesh {
    constructor(params) {
        super();
        const defaultConfig = {
            ...cabinetItemConf,
            origin: [0, 0],
            lazy: true,
            click: () => {},
            doubleClick: () => {},
        };
        this.params = Object.assign(defaultConfig, params);
        this.name = 'CabinetItem';
        this.geometry = shellGeometry;
        this.material = shellMaterial.clone();
        this.init();
        this.isCabinetItem = true;
    }

    async init() {
        const { width: w, height: h, depth: d, lazy } = this.params;
        // this.cabinetItem = drawShell(w, d, h);
        // this.add(this.cabinetItem);
        // this.position.set(posX, 0, posY);

        // 设置案卷位置原点
        const { origin } = this.params;
        origin[0] = w / 2 - 0.51;
        origin[1] = -h / 2;

        if(!lazy){
            this.addArchive();
        }
    }

    addArchive() {
        if(this.children.length !== 0){
            return;
        }

        const [x, y] = this.params.origin;
        const num = Math.round(Math.random() * 5);
        const archiveGroup = new Archive({isGroup: true, num: num});
        archiveGroup.position.set(x-1, 0, y+4);
        this.add(archiveGroup)
    }

    removeArchive(){
        this.children.forEach((archive)=>{
            archive.geometry.dispose();
            this.remove(archive);
        })
    }

    hide(){
        this.material.transparent = true;
        this.material.opacity = 0;
        this.removeArchive();
    }

    show(){
        this.material.transparent = false;
        this.material.opacity = 1;
        this.children.forEach((item)=>{
            if(item.isCabinetItem){
                item.show();
            }
        })
    }

    blink(){
        this.material.transparent = false;
        this.material.opacity = 1;
        this.parent.blink();
    }

    static resetGeometry(w,h,d){
        if(shellGeometry.isGeometry){
            shellGeometry.dispose();
        }
        shellGeometry = new generateGeometry(w, d, h)
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
