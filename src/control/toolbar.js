import './toolbar.scss';
import {Dialog} from '@/utils/dialog';

const searchTemp = '<div><label>档案名称</label><input type="text" class="search"/></div>'

document.querySelector('.search-archive').onclick = ()=>{
    
    Dialog.open(searchTemp, {
        title: '搜索档案',
        yes: (el)=>{
            const name = el.querySelector('.search').value;
            
        }
    });
}

