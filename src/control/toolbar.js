import './toolbar.scss';
import { Dialog } from '@/utils/dialog';
import {scene, control, camera} from '@/global';
import {Vector2, Vector3,Raycaster} from 'three'

const searchTemp = `<div><label>柜列号</label><input type="text" class="search" value="A2"/>
                    <label>柜号</label><input type="text" class="search-item" value="CD5"/></div>`;

document.querySelector('.search-archive').onclick = () => {
    Dialog.open(searchTemp, {
        title: '搜索档案',
        yes: (el) => {
            const cabinetNum = el.querySelector('.search').value;
            const cabinetItemNum = el.querySelector('.search-item').value;
            try{

                const obj = scene.getObjectByName('demo').getObjectByName(cabinetNum);
                const wv3 = new Vector3;
                obj.getWorldPosition(wv3);
                control.target = wv3;
                control.update();
                // obj.material.color=0x000000;

                let count = 0;
                let sColor = obj.material.color.clone();
                let timerId = setInterval(()=>{
                    if(count%2===0){
                        obj.material.color.set(0xff0000)
                    }else{
                        obj.material.color.set(sColor)
                    }
                    count++;
                    if(count === 6){
                        clearInterval(timerId);
                    }
                },300)

                Dialog.close(el);
                
            }catch(e){
                console.log(e)
                alert('未找到该档案柜');
            }
        },
    });
};
