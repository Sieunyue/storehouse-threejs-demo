import {
  MeshLambertMaterial,
  Mesh,
  Group,
  DoubleSide,
  Geometry,
  Vector3,
  Vector2,
  Face3,
  TextureLoader,
  RepeatWrapping,
} from "three";
import { ClickEvent } from "../clickEvent";
import CabinetItem from "./CabinetItem";
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
    this.cabinet.translateX(-w/2);
    this.cabinet.translateZ(-h/2);
    this.add(this.cabinet);
    this.position.set(0, 0, 1);

    ClickEvent.on("click", this.cabinet, (obj) => {
      if (this.cabinet.uuid === obj.uuid) {
        this.config.click(this);
      }
    });

    ClickEvent.on("doubleClick", this.cabinet, (obj) => {
      if (this.cabinet.uuid === obj.uuid) {
        this.config.doubleClick(this);
      }
    });

    this.createCabinet(4, 4);
  }

  setDoubleClickFunc(fn) {
    if (!fn instanceof Function) {
      return;
    }
    this.config.doubleClick = fn;
  }

  createCabinet(row, col) {
    const w = (this.config.width - (col -1))/ col,
      h = (this.config.height - (row - 1)) / row;
    const startX = this.config.width - w,
      startY = this.config.height - h;
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        this.cabinet.add(
          new CabinetItem({
            width: w,
            height: h,
            posX: startX - (j * w) - (j === 0? 0: 1),
            posY: startY - (i * h) - (i === 0? 0: 1),
          })
        );
      }
    }
  }
}

function drawShell(w, h, d) {
  const geometry = generateGeometry(w, h, d);
  const texture = new TextureLoader().load("../../public/static/c1.png");

  const materials = [];
  for (let i = 0; i < geometry.faces.length / 2; i++) {
    materials.push(
      new MeshLambertMaterial({
        side: DoubleSide,
        map: texture,
      })
    );
  }
  const mesh = new Mesh(geometry, materials);
  return mesh;
  // return new Promise((resolve, reject) => {
  //     // loader.load('../../public/static/floor.png', (texture) => {
  //     //     texture.wrapS = texture.wrapT = RepeatWrapping;
  //     //     texture.repeat.set(1, 1);
  //     //     const materials = [];
  //     //     for(let i = 0; i < geometry.faces.length/2; i++){
  //     //         materials.push(new MeshLambertMaterial({
  //     //             side: DoubleSide,
  //     //             map: texture
  //     //         }));
  //     //     }

  //     //     const mesh = new Mesh(geometry, materials);

  //     //     resolve(mesh);
  //     // });
  // });
}

function generateGeometry(w, h, d) {
  const geometry = new Geometry();
  const v3 = [
    new Vector3(0, 0, d), //0
    new Vector3(w, 0, d),
    new Vector3(w, h, d),
    new Vector3(0, h, d),

    new Vector3(0, 0, 0), //4
    new Vector3(w, 0, 0),
    new Vector3(w, h, 0),
    new Vector3(0, h, 0),

    new Vector3(0 - 1, 0, d + 1), //8
    new Vector3(w + 1, 0, d + 1),
    new Vector3(w + 1, h, d + 1),
    new Vector3(0 - 1, h, d + 1),

    new Vector3(0 - 1, 0, 0 - 1), //12
    new Vector3(w + 1, 0, 0 - 1),
    new Vector3(w + 1, h, 0 - 1),
    new Vector3(0 - 1, h, 0 - 1),
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

    // new Face3(3 + 8, 0 + 8, 2 + 8),
    // new Face3(0 + 8, 1 + 8, 2 + 8),
    // new Face3(4 + 8, 5 + 8, 7 + 8),
    // new Face3(5 + 8, 6 + 8, 7 + 8),
    // new Face3(5 + 8, 6 + 8, 1 + 8),
    // new Face3(6 + 8, 2 + 8, 1 + 8),
    // new Face3(7 + 8, 4 + 8, 3 + 8),
    // new Face3(4 + 8, 0 + 8, 3 + 8),

    // new Face3(0, 8, 12),
    // new Face3(0, 4, 12),
    // new Face3(1, 9, 13),
    // new Face3(1, 5, 13),
    // new Face3(4, 5, 12),
    // new Face3(5, 12, 13),
    // new Face3(0, 8, 9),
    // new Face3(0, 1, 9),

    // new Face3(3, 11, 15),
    // new Face3(3, 7, 15),
    // new Face3(2, 10, 14),
    // new Face3(2, 6, 14),
    // new Face3(7, 6, 15),
    // new Face3(6, 15, 14),
    // new Face3(3, 11, 10),
    // new Face3(3, 2, 10),
  ];

  geometry.vertices = v3;
  geometry.faces = faces;

  geometry.computeFaceNormals();
  geometry.computeVertexNormals();
  const uv = [
    new Vector2(0, 0),
    new Vector2(1, 0),
    new Vector2(1, 1),
    new Vector2(0, 1),
  ];
  for (let i = 0; i < geometry.faces.length; i += 2) {
    geometry.faceVertexUvs[0][i] = [uv[0], uv[1], uv[3]];
    geometry.faceVertexUvs[0][i + 1] = [uv[1], uv[2], uv[3]];
  }

  return geometry;
}

// function drawShell(w, h, d, x, y, z) {
//     const gemotery = new BoxGeometry(w, h, d);
//     const mesh = new Mesh(gemotery, material);
//     mesh.position.set(x, y, z);
//     return mesh;
// }

export default Cabinet;
