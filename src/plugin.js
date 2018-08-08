/**
 * Created by Liqiaomiao on 2018/8/4.
 */
import Toast from './toast.vue'
export default {
    install(Vue,options){
        Vue.prototype.$toast=function (msg,toastOptions) {
         let Constructor=Vue.extend(Toast);
            let toast = new Constructor(
             {
                 propsData: toastOptions
             }
         );
            toast.$slots.default=[msg];
         toast.$mount();
         document.body.appendChild(toast.$el);
        }
    }
}