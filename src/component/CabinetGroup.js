import { Group, Object3D } from 'three';
import { ClickEvent } from '../clickEvent';
import {scene, camera} from '../global'
import TWEEN from '@tweenjs/tween.js';
import Cabinet from './Cabinet';

class CabinetGroup extends Group {
    constructor(config) {
        super();
        const defaultConfig = {
            cabinetConfig: {
                width: 70,
                height: 40,
                depth: 10,
                click: (cabinet) => {
                    this.openCabinet(cabinet);
                },
                doubleClick: (cabinet) => {
                    const cabinetDetail = cabinet.clone(cabinet, true);
                    cabinetDetail.position.copy(camera.position);
                    cabinetDetail.rotation.copy(camera.rotation);
                    cabinetDetail.updateMatrix();
                    cabinetDetail.translateZ( - 40 );
                    cabinetDetail.rotateX(Math.PI/2);
                    cabinetDetail.setDoubleClickFunc((o)=>{
                        ClickEvent.off(o.cabinet);
                        scene.remove(o)
                    })
                    scene.add(cabinetDetail)
                }
            },
            openIndex: 0,
            number: 5,
        };
        this.config = Object.assign(defaultConfig, config);
        this.init();
    }

    init() {
        const { number, cabinetConfig } = this.config;

        for (let i = 0; i < number; i++) {
            const cabinet = new Cabinet(cabinetConfig);
            cabinet.position.y = i * this.config.cabinetConfig.depth;
            this.add(cabinet);
        }
        this.position.y = -2;
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
        const openIndex = this.config.openIndex;

        if (index === -1) {
            return;
        }

        const cabinets = this.children;
        if (index > openIndex) {
            for (let s = index, e = openIndex; e < s; e++) {
                let spos = { y: cabinets[e].position.y };
                let tween1 = new TWEEN.Tween(spos)
                    .to({ y:  cabinets[e].position.y - this.config.cabinetConfig.depth }, 300)
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .onUpdate(() => {
                        cabinets[e].position.y = spos.y;
                    });
                tween1.start();
            }
            
        }else{
            for (let s = openIndex, e = index; e < s; e++) {
                let spos = { y: cabinets[e].position.y };
                let tween1 = new TWEEN.Tween(spos)
                    .to({ y:  cabinets[e].position.y + this.config.cabinetConfig.depth }, 300)
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .onUpdate(() => {
                        cabinets[e].position.y = spos.y;
                    });
                tween1.start();
            }
        }

        this.config.openIndex = index;
    }
}

export default CabinetGroup;
