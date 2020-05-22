import './dialog.scss';

let index = 0;
class Dialog {
    constructor() {}

    static open(html, config) {

        const _config = {
            title: '提示',
            close: ()=>{
                Dialog.close($wrap);
            },
            yes: ()=>{
                Dialog.close($wrap);
            }
        }

        Object.assign(_config, config);

        const $wrap = document.createElement('div');
        const newIndex = index + 1;
        index++;
        $wrap.classList.add('dialog-wrap');
        $wrap.innerHTML = `<div class="dialog-wrap">
        <div class="dialog">
            <button class="iconfont icon-guanbi dialog-close"></button>
            <div class="dialog-header">
                <div class="dialog-title">提示</div>
            </div>
            <div class="dialog-body">${html||''}</div>
            <div class="dialog-footer">
                    <button class="btn btn-primary yes">确定</button>
                    <button class="btn btn-normal close">关闭</button>
                </div>
            </div>
        </div>`;

        $wrap.querySelector('.dialog-close').onclick = _config.close;
        $wrap.querySelector('.dialog-footer .close').onclick = _config.close;
        $wrap.querySelector('.dialog-footer .yes').onclick = ()=>{
            _config.yes($wrap);
        }

        document.querySelector('body').appendChild($wrap);
    }

    static close($wrap){
        $wrap.parentNode.removeChild($wrap);
    }
}

export { Dialog };
