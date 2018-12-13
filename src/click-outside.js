/**
 * Created by Liqiaomiao on 2018/12/13.
 */
let onclickDocument =  ({target}) =>{
    callbacks.forEach(({el,value})=>{
        console.log(target, el);
        if(target==el || el.contains(target)){
           return
       }else{
           value()
       }
    })
}
document.addEventListener('click',onclickDocument);
let callbacks=[];
export default {
    bind:function (el,binding,vnode) {
        callbacks.push({el,value:binding.value})
    }
}
let removeListener =  ()=> {
    document.removeListener('click',onclickDocument)
}
export {removeListener}