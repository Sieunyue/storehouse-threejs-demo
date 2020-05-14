import {
    PlaneGeometry,
    BoxGeometry,
    MeshLambertMaterial,
    Mesh,
    DoubleSide,
    Group,
    TextureLoader,
    RepeatWrapping,
} from 'three';

class Store {
    constructor(scene, config) {
        const defaultConfig = {
            width: 400,
            height: 200,
            depth: 20,
            // rotate: 4,
        }

        this.store = new Group();
        this.init(scene, Object.assign(defaultConfig, config));
    }

    getStore() {
        return this.store;
    }

    async init(scene, config) {
        const {width,height,depth,rotate} = config;

        this.store.add(await drawFloor(width, height));

        this.store.add(await drawWalls(width, 1, depth, 0, height/2, depth/2));
        this.store.add(await drawWalls(width, 1, depth, 0, -(height/2), depth/2));
        this.store.add(await drawWalls(1, height, depth, -(width/2), 0, depth/2));
        this.store.add(await drawWalls(1, height, depth, width/2, 0, depth/2));
        this.store.rotateX((Math.PI/2));
        this.store.position.set(0,-1, 0);
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
                color: '#D2D3D5'
                // map: texture
            });

            const mesh = new Mesh(gemotery, material);

            resolve(mesh);
        });
    });

    // mesh.position.y = 0;

    // mesh.rotateX(-(Math.PI / 5));
}
const materials = [];
for(let i = 0; i < 12; i++){
    let color = i === 4? '#FDFDFD': '#9DB4D2';
    materials.push(new MeshLambertMaterial({
        side: DoubleSide,
        color: color,
    }))
}

function drawWalls(w, h, d, x, y, z) {
    return new Promise((resolve, reject) => {
        const loader = new TextureLoader();

        // loader.load('../../public/static/wall.png', (texture) => {
            const gemotery = new BoxGeometry(w, h, d);

            // const material = new MeshLambertMaterial({
            //     side: DoubleSide,
            //     color: '#9DB4D2',
            //     // color:#FDFDFD
            // });

            const mesh = new Mesh(gemotery, materials);

            // mesh.position.y = 0;
            mesh.position.set(x, y, z);

            resolve(mesh);
        // });
    });
}

export default Store;
// drawFloor();
