import { BoxGeometry, MeshLambertMaterial, Mesh, Group, DoubleSide } from 'three';
import {ClickEvent} from '../clickEvent';
import Cabinet from './Cabinet'
// const material = new MeshLambertMaterial({
//     side: DoubleSide,
//     color: '#FDFDFD',
// });

class CabinetGroup extends Group{
    constructor(config) {
        super();
        const defaultConfig = {
            cabinetConfig: {
                width: 70,
                height: 40,
                depth: 20,
                click: (cabinet)=>{
                    cabinet.children[0].position.y -= 20;
                }
            },
            number: 5,
        }
        this.config = Object.assign(defaultConfig, config);
        this.init();
    }

    init() {
        const {number, cabinetConfig} = this.config;

        for(let i = 0; i < number; i++){
            const cabinet = new Cabinet(cabinetConfig);
            cabinet.position.y = i * 21;
            this.add(cabinet);
        }
    }
}

export default CabinetGroup;
