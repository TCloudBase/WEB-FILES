/**
 * 【工具】判断是否属于微信浏览器
 * @method isWeClient()
 * @returns {boolean}
 *
 * 【工具】下载文件（a标签方法）
 * @method downLoad()
 * @param  url 目标文件地址
 * @param  name 想要保存的文件名称
 *
 *  【工具】封装的原生请求方法
 *  @method calls(obj)
 *  @param  {string} obj.url 请求地址
 *  @param  {json} obj.data 请求数据
 *  @param  {function} obj.success 成功回调
 *  @param  {function} obj.fail 失败回调
 *
 *  【工具】自制展示通知提示 id需为myModal
 * @method showModel(text,time,type)
 * @param text 展示文字
 * @param time 展示时长
 * @param type 提示类型(error,warning,success)
 *
 * 【工具】批量显示元素
 * @method toShow(id)
 * @param id 元素id数组
 *
 * 【工具】批量隐藏元素
 * @method toHide(id)
 * @param id 元素id数组
 *
 * 【工具】编辑元素样式信息
 * @method editClass(id,e)
 * @param {string}id 元素id
 * @param {array}e.add 增加class的数组
 * @param {array}e.remove 删除class的数组
 * @param {array}e.addT 增加属性数组{name:'属性名',value:'属性值'}
 * @param {array}e.removeT 删除class的数组
 * @param {string}e.style 直接内联样式
 * @param {string}e.text 元素文字内容（不适合html元素）
 *
 * 【工具】获得html元素
 * @method getElm(id)
 * @param {string}id 元素id
 * @returns {HTMLElement}
 *
 * 【工具】复制文字到剪切板
 * @method copyToClipboard(obj)
 * @param {string} obj.text 复制的文字
 * @param {function} obj.success 成功回调方法
 * @param {function} obj.fail 失败回调方法
 */





/**
 * 【工具】判断是否属于微信浏览器
 * @returns {boolean}
 */
function isWeClient() {
    let ua = window.navigator.userAgent.toLowerCase();
    console.log(ua);
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

/**
 * 【工具】下载文件（a标签方法）
 * @param  url 目标文件地址
 * @param  name 想要保存的文件名称
 */
function downLoad(url,name) {
    let link = document.createElement('a');
    let body = document.querySelector('body');
    link.href = url;
    link.download = name;
    link.style.display = 'none';
    body.appendChild(link);
    link.click();
    body.removeChild(link);
}

/**
 * 【工具】封装的原生请求方法
 *  @param  {string} obj.url 请求地址
 *  @param  {json} obj.data 请求数据
 *  @param  {function} obj.success 成功回调
 *  @param  {function} obj.fail 失败回调
 */
function calls(obj) {
    let xml=new XMLHttpRequest();
    xml.open("POST",obj.url,true);
    xml.setRequestHeader("Content-type","application/json");
    xml.send(JSON.stringify(obj.data));
    xml.responseType='text';
    xml.onreadystatechange=function() {
        if (xml.readyState === 4 && xml.status === 200) {
            obj.success(JSON.parse(xml.responseText))
        }
        else{
            obj.fail(xml.status);
        }
    }
}

/**
 * 【工具】自制展示通知提示
 * @param text 展示文字
 * @param time 展示时长
 * @param type 提示类型(error,warning,success)
 */
function showModel(text,time,type) {
    document.getElementById('myModal').innerText=text;
    let types = ['error','warning','success','noShow'];
    types.splice(types.indexOf(type),1);
    editClass('myModal',{
        add:[type,'ns-show'],
        remove:types,
        style:''
    });
    if(modalFlag)clearTimeout(modalFlag);
    modalFlag=setTimeout(function(){
        editClass('myModal',{
            add:['ns-hide'],
            remove:['ns-show'],
            style:''
        });
        setTimeout(function(){
            editClass('myModal',{
                add:['noShow'],
                remove:[type,'ns-hide'],
                style:''
            });
        },400);
    },time);
}

/**
 * 【工具】批量显示元素
 * @param id 元素id数组
 */
function toShow(id) {
    for(let i of id){
        document.getElementById(i).classList.remove('noShow');
    }
}

/**
 * 【工具】批量隐藏元素
 * @param id 元素id数组
 */
function toHide(id) {
    for(let i of id){
        document.getElementById(i).classList.add('noShow');
    }
}

/**
 * 【工具】编辑元素样式信息
 * @param {string}id 元素id
 * @param {array[string]}e.add 增加class的数组
 * @param {array[string]}e.remove 删除class的数组
 * @param {array[object]}e.addT 增加属性数组{name:'属性名',value:'属性值'}
 * @param {array[string]}e.removeT 删除class的数组
 * @param {string}e.style 直接内联样式
 * @param {string}e.text 元素文字内容（不适合html元素）
 */
function editClass(id,e) {
    let elm = document.getElementById(id);
    if(e.add!=null) {
        for (let i of e.add) {
            elm.classList.add(i);
        }
    }
    if(e.remove!=null){
        for(let i of e.remove){
            elm.classList.remove(i);
        }
    }
    if(e.addT!=null){
        for(let i of e.addT){
            elm.setAttribute(i.name,i.value);
        }
    }
    if(e.removeT!=null){
        for(let i of e.removeT){
            elm.removeAttribute(i);
        }
    }
    e.style!=null?elm.style=e.style:null;
    e.text!=null?elm.innerText=e.text:null;
}

/**
 * 【工具】获得html元素
 * @param {string}id 元素id
 * @returns {HTMLElement}
 */
function getElm(id) {
    return document.getElementById(id);
}

/**
 * 【工具】复制文字到剪切板
 * @param {string} obj.text 复制的文字
 * @param {function} obj.success 成功回调方法
 * @param {function} obj.fail 失败回调方法
 */
function copyToClipboard(obj) {
                try {
                    var text=obj.text;
                    var Input = document.createElement('textarea');
                    Input.value = text;
                    document.body.appendChild(Input);
                    Input.select(); // 选择对象
                    document.execCommand("Copy"); // 执行浏览器复制命令
                    Input.style.display='none';
                    obj.success!=null?obj.success():null;
                } catch (err) {
                    obj.fail!=null?obj.fail():null;
                }
                document.body.removeChild(Input);
            }