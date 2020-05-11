import {BoxGeometry, MeshBasicMaterial, Mesh} from 'three';
import {ClickEvent} from '../clickEvent';

const geometry = new BoxGeometry(10, 20, 50);
const material = new MeshBasicMaterial({color: 0xC8754A});

class Archive{
    constructor(){
        this._mesh = new Mesh(geometry, material);
        ClickEvent.on('click', this._mesh, (obj) => {
            if(obj === this._mesh){
                window.alert('档案详情');
            }
        })
    }

    getMesh(){
        return this._mesh;
    }
}


export default Archive;