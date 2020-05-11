import {
    PlaneGeometry,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    DoubleSide,
    Object3D,
    TextureLoader,
    RepeatWrapping,
} from 'three';

class Store {
    constructor(scene, config) {
        const defaultConfig = {
            width: 100,
            height: 37,
            depth: 7,
            rotate: 4,
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

        this.store.add(await drawWalls(width, 10, depth, 0, height/2, depth/2));
        this.store.add(await drawWalls(width, 10, depth, 0, -(height/2), depth/2));
        this.store.add(await drawWalls(10, height, depth, -(width/2), 0, depth/2));
        this.store.add(await drawWalls(10, height, depth, width/2, 0, depth/2));
        this.store.rotateX(-(Math.PI / rotate));

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
            const gemotery = new BoxGeometry(w,h, 2);
            const material = new MeshBasicMaterial({
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

            const material = new MeshBasicMaterial({
                side: DoubleSide,
                color: '#4C5264',
            });

            const mesh = new Mesh(gemotery, material);

            // mesh.position.y = 0;
            mesh.position.set(x, y, z);

            resolve(mesh);
        // });
    });
}

export default Store;
// drawFloor();
