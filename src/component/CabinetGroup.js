import { Group, MeshBasicMaterial, PlaneGeometry, Mesh} from 'three/build/three.min.js';
import TWEEN from '@tweenjs/tween.js';
import Cabinet from './Cabinet';

const {cabinetGroupConf} = config;
class CabinetGroup extends Group {
    constructor(params) {
        super();
        const defaultConfig = {
            openIndex: 0,
            number: cabinetGroupConf.number,
            lazy: true,
            children: []
        };
        this.name = 'CabinetGroup';
        this.params = Object.assign(defaultConfig, params);
        this.lineMaterial = new MeshBasicMaterial( { color: 0x00 } );
        this.lineGeometry = new PlaneGeometry(1,1);
        this.init();
    }

    init() {
        const { number} = this.params;
        let lineLength = 0, lineDist = 0, linePosZ = 0;

        for (let i = 0; i < number; i++) {
            const cabinet = new Cabinet({
                ...this.params.children[i],
                lazy: false,
                // click: (cabinet)=>{
                //     this.openCabinet(cabinet);
                // }
            });
            cabinet.position.y = i * (cabinet.params.depth+40);
            lineLength = cabinet.position.y;
            lineDist = cabinet.params.width;
            linePosZ = cabinet.params.height;
            this.add(cabinet);
            
        }
        this.params.openIndex = number-1;
        const way = this.drawPathway(lineLength, lineDist/4);
        way.position.set(0, lineLength /2, -linePosZ/2 - .2)
        this.add(way);
        
    }

    getCabinetIndex(cabinet) {
        let index = -1;
        for (let i = 0, len = this.children.length; i < len; i++) {
            if (this.children[i].uuid === cabinet.uuid) {
                index = i;
                break;
            }
        }
        return index;
    }

    openCabinet(cabinet) {
        const index = this.getCabinetIndex(cabinet);
        const openIndex = this.params.openIndex;

        if (index === -1) {
            return;
        }

        const cabinets = this.children;
        if (index > openIndex) {
            for (let s = index, e = openIndex+1; e <= s; e++) {
                let spos = { y: cabinets[e].position.y };
                let tween1 = new TWEEN.Tween(spos)
                    .to({ y:  cabinets[e].position.y - cabinet.params.depth-10 }, 300)
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .onUpdate(() => {
                        cabinets[e].position.y = spos.y;
                    });
                tween1.start();
            }
            
        }else{
            for (let s = openIndex, e = index+1; e <= s; e++) {
                let spos = { y: cabinets[e].position.y };
                let tween1 = new TWEEN.Tween(spos)
                    .to({ y:  cabinets[e].position.y + cabinet.params.depth +10 }, 300)
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .onUpdate(() => {
                        cabinets[e].position.y = spos.y;
                    });
                tween1.start();
            }
        }

        this.params.openIndex = index;

        this.children.forEach((o)=>{
            if(o.isCabinet){
                if(o.uuid === cabinet.uuid){
                    o.showArchive();
                }else{
                    o.hideArchive();
                }
            }
        })
    }

    drawPathway(w, dist){
        const {lineGeometry, lineMaterial} = this;
        const group = new Group();
        const mesh1 = new Mesh(lineGeometry, lineMaterial);
        mesh1.scale.set(2,w,0);
        const mesh2 = mesh1.clone();
        mesh2.position.set(dist, 0, 0);
        const mesh3 = mesh1.clone();
        mesh3.position.set(-dist, 0, 0);
        group.add(mesh1,mesh2,mesh3);

        return group;
    }
}


export default CabinetGroup;
