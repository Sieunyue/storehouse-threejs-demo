import {BoxGeometry, MeshBasicMaterial, Mesh} from 'three';
import {ClickEvent} from '../clickEvent';
import {archiveConf} from '@/config';


const geometry = new BoxGeometry(archiveConf.width, archiveConf.height, archiveConf.depth);
const material = new MeshBasicMaterial({color: 0xC8754A});

class Archive extends Mesh{
    constructor(config){
        super();
        this.config = config;
        this.material = material;
        this.geometry = geometry;

        ClickEvent.on('doubleClick', this, (obj) => {
            if (this.uuid === obj.uuid) {
                alert('点击案卷');
            }
        });
    }
}


export default Archive;