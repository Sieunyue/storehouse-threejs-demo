import {BoxGeometry, MeshLambertMaterial, Mesh} from 'three';
import {archiveConf} from '@/config';


const geometry = new BoxGeometry(archiveConf.width, archiveConf.height, archiveConf.depth);
const material = new MeshLambertMaterial({color: 0xC8754A});

class Archive extends Mesh{
    constructor(config){
        super();
        this.config = Object.assign(archiveConf, config);
        this.material = material.clone();
        this.geometry = geometry.clone();
        this.init();
    }

    init(){
        const {isGroup, num, width} = this.config;
        if(isGroup){
            for(let i = 0; i < num; i++){
                const _geo = geometry.clone();
                const _mat = material.clone();
                const _mesh = new Mesh(_geo, _mat);
                _mesh.position.x = (-i * (width+.1)+.5);
                _mesh.updateMatrix();
                this.geometry.merge(_mesh.geometry, _mesh.matrix);
            }
        }
    }
}

export default Archive;