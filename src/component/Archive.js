import {BoxGeometry, MeshBasicMaterial, Mesh} from 'three';
import {ClickEvent} from '../clickEvent';
class Archive{
    constructor(){
        this._geometry = new BoxGeometry(.2, 1, 1);
        this._material = new MeshBasicMaterial({color: 0xC8754A});
        this._mesh = new Mesh(this._geometry, this._material);
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