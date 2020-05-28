import {
    PlaneGeometry,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    DoubleSide,
    Group,
    TextureLoader,
    RepeatWrapping,
    MeshLambertMaterial,
} from 'three/build/three.min.js';
import { ClickEvent } from '@/control/clickEvent';
import ThreeBSP from '@/utils/threebsp';
import TWEEN from '@tweenjs/tween.js';

const texture = new TextureLoader().load('../../public/static/floor.png');
texture.wrapS = RepeatWrapping;
texture.wrapT = RepeatWrapping;
texture.repeat.set(10, 10);
const floorMaterial = new MeshBasicMaterial({
    side: DoubleSide,
    map: texture,
});

const wallMesh = {
    gemotery: new BoxGeometry(1, 1, 1),
    material: new MeshLambertMaterial({
        side: DoubleSide,
        color: 0x5e8ebe,
    }),
};

const windowTexture = new TextureLoader().load('../../public/static/window.png');
windowTexture.wrapS = RepeatWrapping;
windowTexture.wrapT = RepeatWrapping;
windowTexture.repeat.set(2, 1);
const windowMaterial = new MeshBasicMaterial({
    side: DoubleSide,
    map: windowTexture,
    transparent: true,
    opacity: 1,
    color: 0xffffff,
});

class Store extends Group {
    constructor(config) {
        super();
        this.width = 350;
        this.height = 250;
        this.depth = 50;
        Object.assign(this, config);
        this.init();
        this.rotateX(Math.PI / 2);
    }
    init() {
        const { width: w, height: h, depth: d } = this;
        this.add(drawFloor(w, h));
        this.add(drawWalls(w, 2, d, 0, -(h / 2), d / 2));
        this.add(drawWalls(2, h, d, -(w / 2), 0, d / 2));
        this.add(drawWalls(2, h, d, w / 2, 0, d / 2));
        // const walls = drawWalls(w, 2, d, 0, h / 2, d / 2);
        const walls = new Mesh(new BoxGeometry(w,2,d), wallMesh.material);
        const doorGeo = new BoxGeometry(30, 2, d);
        const doorSub = new Mesh(doorGeo, new MeshLambertMaterial({ transparent: true, opacity: 0.3, color: 0xffffff }));
        doorSub.position.set(-60,0,0);
        let winSub = drawWalls(30, 2, d - 20, 120, 0, 0);
        let winSub2 = drawWalls(60, 2, d - 20, 45, 0, 0);
        let winSub3 = drawWalls(30, 2, d - 20, -130, 0, 0);
        let res = new ThreeBSP(walls)
            .subtract(new ThreeBSP(doorSub))
            .subtract(new ThreeBSP(winSub))
            .subtract(new ThreeBSP(winSub2))
            .subtract(new ThreeBSP(winSub3))
            .toMesh(wallMesh.material);
        doorSub.material = doorSub.material.clone();
        doorSub.material.color.set(0xffffff);
        doorSub.material.transparent = true;
        doorSub.material.opacity = 0.3;
        const doorWrap = new Group();
        doorWrap.add(doorSub);
        doorWrap.position.set(-75,0,0);
        doorSub.position.set(15,0,0);
        winSub.material = windowMaterial;
        winSub.position.set(120, 0, 0);
        winSub2.material = windowMaterial;
        winSub2.position.set(45, 0, 0);
        winSub3.material = windowMaterial;
        winSub3.position.set(-130, 0, 0);
        res.add(doorWrap);
        res.add(winSub);
        res.add(winSub2);
        res.add(winSub3);
        res.position.set(0, h/2, d/2);
        this.add(res);
        ClickEvent.on('click', doorSub, (obj) => {
            if (obj.uuid !== doorSub.uuid) {
                return;
            }
            const rotationZ = obj.parent.rotation.z;
            let s = 0,
                e = 0;
            if (rotationZ === 0) {
                s = 0;
                e = -Math.PI / 2;
            } else {
                e = 0;
                s = -Math.PI / 2;
            }
            const pos = { r: s };
            let tween1 = new TWEEN.Tween(pos)
                .to({ r: e }, 300)
                .easing(TWEEN.Easing.Quadratic.Out)
                .onUpdate(() => {
                    obj.parent.rotation.z = pos.r;
                });
            tween1.start();
        });
    }
}

function drawFloor(w, h) {
    const plane = new PlaneGeometry(w, h);
    const planeMesh = new Mesh(plane, floorMaterial);
    return planeMesh;
}

function drawWalls(w, h, d, x, y, z) {
    const mesh = new Mesh(wallMesh.gemotery, wallMesh.material);
    mesh.scale.set(w, h, d);
    mesh.position.set(x, y, z);
    return mesh;
}

export default Store;
// drawFloor();
