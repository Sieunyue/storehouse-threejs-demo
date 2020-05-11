import {
    PlaneGeometry,
    BoxGeometry,
    MeshLambertMaterial,
    Mesh,
    DoubleSide,
    Object3D,
    TextureLoader,
    RepeatWrapping,
    Line,
    LineBasicMaterial,
    Geometry,
    Vector3,
} from 'three';

class Store {
    constructor(scene, config) {
        const defaultConfig = {
            width: 100,
            height: 80,
            depth: 10,
            // rotate: 4,
        }

        this.store = new Object3D();
        this.init(scene, Object.assign(defaultConfig, config));
    }

    getStore() {
        return this.store;
    }

    async init(scene, config) {
        const {width,height,depth,rotate} = config;

        this.store.add(await drawFloor(width, height));

        this.store.add(await drawWalls(width, 2, depth, 0, height/2, depth/2));
        this.store.add(await drawWalls(width, 2, depth, 0, -(height/2), depth/2));
        this.store.add(await drawWalls(2, height, depth, -(width/2)+1, 0, depth/2));
        this.store.add(await drawWalls(2, height, depth, width/2-1, 0, depth/2));
        // this.store.rotateX(-(Math.PI / rotate));
        linexFun(scene)
        lineyFun(scene)
        linezFun(scene)
        // this.store.position.set(0,0,width/2)
        scene.add(this.store);

    }
}

function drawFloor(w, h) {
    const loader = new TextureLoader();

    return new Promise((resolve, reject) => {
        loader.load('../../public/static/floor.png', (texture) => {
            texture.wrapS = texture.wrapT = RepeatWrapping;
            texture.repeat.set(10, 10);
            const gemotery = new PlaneGeometry(w,h);
            const material = new MeshLambertMaterial({
                side: DoubleSide,
                // color: '#D2D3D5'
                map: texture
            });

            const mesh = new Mesh(gemotery, material);

            resolve(mesh);
        });
    });

    // mesh.position.y = 0;

    // mesh.rotateX(-(Math.PI / 5));
}

function drawWalls(w, h, d, x, y, z) {
    return new Promise((resolve, reject) => {
        const loader = new TextureLoader();

        // loader.load('../../public/static/wall.png', (texture) => {
            const gemotery = new BoxGeometry(w, h, d);

            const material = new MeshLambertMaterial({
                side: DoubleSide,
                color: '#9DB4D2',
                // color:0x00ffff
            });

            const mesh = new Mesh(gemotery, material);

            // mesh.position.y = 0;
            mesh.position.set(x, y, z);

            console.log(gemotery);

            resolve(mesh);
        // });
    });
}

function linexFun(scene){
    var material = new LineBasicMaterial({
        color: 0x000000
    });

    var geometry = new Geometry();
    geometry.vertices.push(
        new Vector3(-70, 0, 0),
        new Vector3(100, 0, 0),
    );

    var line = new Line(geometry, material);
    scene.add(line);
}

// y轴
function lineyFun(scene){
    var material = new LineBasicMaterial({
        color: 0xFFFF00
    });

    var geometry = new Geometry();
    geometry.vertices.push(
        new Vector3(0, -70, 0),
        new Vector3(0, 100, 0),
    );

    var line = new Line(geometry, material);
    scene.add(line);
}

// z轴
function linezFun(scene){
    var material = new LineBasicMaterial({
        color: 0x0000FF
    });

    var geometry = new Geometry();
    geometry.vertices.push(
        new Vector3(0, 0, -70),
        new Vector3(0, 0, 100),
    );

    var line = new Line(geometry, material);
    scene.add(line);
}

export default Store;
// drawFloor();
