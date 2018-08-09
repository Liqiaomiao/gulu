/**
 * Created by Liqiaomiao on 2018/8/4.
 */
import Toast from './toast.vue'
let toastinit=''
export default {
    install(Vue,options){
        Vue.prototype.$toast=function (msg,toastOptions) {
            if(toastinit){
                toastinit.close();
            }
            toastinit = createToast({Vue,msg,propsData:toastOptions})
        }
    }
}

function createToast({Vue,msg,toastOptions}) {
    let Constructor=Vue.extend(Toast);
    let toast = new Constructor(toastOptions);
    toast.$slots.default=[msg];
    toast.$mount();
    document.body.appendChild(toast.$el);
    return toast
}