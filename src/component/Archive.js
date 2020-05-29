import {BoxGeometry, MeshLambertMaterial, Mesh} from 'three/build/three.min.js';
// import {archiveConf} from '@/config';

const {archiveConf} = config;
const geometry = new BoxGeometry(archiveConf.width, archiveConf.height, archiveConf.depth);
const material = new MeshLambertMaterial({color: 0xC8754A});

class Archive extends Mesh{
    constructor(params){
        super();
        this.params = Object.assign(archiveConf, params);
        this.material = material;
        this.geometry = geometry.clone();
        this.name = 'Archive';
        this.init();
    }

    init(){
        const {isGroup, num, width} = this.params;
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