import { Group} from 'three';
import TWEEN from '@tweenjs/tween.js';
import Cabinet from './Cabinet';
import {cabinetGroupConf} from '@/config';

class CabinetGroup extends Group {
    constructor(config) {
        super();
        const defaultConfig = {
            openIndex: 0,
            number: cabinetGroupConf.number,
        };
        this.config = Object.assign(defaultConfig, config);
        this.init();
    }

    init() {
        const { number} = this.config;

        for (let i = 0; i < number; i++) {
            const cabinet = new Cabinet({
                click: (cabinet)=>{
                    this.openCabinet(cabinet);
                }
            });
            cabinet.position.y = -i * cabinet.config.depth;
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
                    .to({ y:  cabinets[e].position.y + cabinet.config.depth }, 300)
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
                    .to({ y:  cabinets[e].position.y - cabinet.config.depth }, 300)
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
