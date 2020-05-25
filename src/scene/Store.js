import { PlaneGeometry, BoxGeometry, MeshBasicMaterial, Mesh, DoubleSide, Group, TextureLoader, RepeatWrapping ,MeshLambertMaterial} from 'three';

const texture = new TextureLoader().load('../../public/static/floor2.png');
texture.wrapS = RepeatWrapping;
texture.wrapT = RepeatWrapping;
texture.repeat.set(10, 10);
const floorMaterial = new MeshBasicMaterial({
    side: DoubleSide,
    map: texture,
});

class Store extends Group {
    constructor(config) {
        super();
        this.width = 300;
        this.height = 400;
        this.depth = 40;
        Object.assign(this, config);
        this.init();
        this.rotateX(Math.PI / 2);
        // this.store = new Group();
        // this.init(scene, Object.assign(defaultConfig, config));
    }
    init() {
        const { width: w, height: h, depth:d } = this;
        this.add(drawFloor(w, h));
        this.add(drawWalls(w, 1, d, 0, h / 2, d / 2));
        this.add(drawWalls(w, 1, d, 0, -(h / 2), d / 2));
        this.add(drawWalls(1, h, d, -(w / 2), 0, d / 2));
        this.add(drawWalls(1, h, d, w / 2, 0, d / 2));
    }
    // async init(scene, config) {
    //     const {width,h,depth,rotate} = config;

    //     this.store.add(await drawFloor(width, h));

    //     this.store.rotateX((Math.PI/2));
    //     this.store.position.set(0,0, 0);
    //     // this.store.position.set(0,0,width/2)
    //     scene.add(this.store);

    // }
}

function drawFloor(w, h) {
    const plane = new PlaneGeometry(w, h);
    const planeMesh = new Mesh(plane, floorMaterial);
    return planeMesh;
}
const materials = [];
for (let i = 0; i < 12; i++) {
    let color = i === 4 ? '#FDFDFD' : '#5E8EBE';
    materials.push(
        new MeshLambertMaterial({
            side: DoubleSide,
            color: color,
        })
    );
}

function drawWalls(w, h, d, x, y, z) {
    const gemotery = new BoxGeometry(w, h, d);

    const mesh = new Mesh(gemotery, materials);

    mesh.position.set(x, y, z);
    return mesh;
}

export default Store;
// drawFloor();