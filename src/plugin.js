/**
 * Created by Liqiaomiao on 2018/8/4.
 */
import Toast from "./components/toast/toast.vue";
let toastinit = "";
export default {
  install(Vue, options) {
    Vue.prototype.$toast = function(msg, toastOptions) {
      if (toastinit) {
        toastinit.close();
      }
      toastinit = createToast({ Vue, msg, propsData: toastOptions });
    };
  }
};

function createToast({ Vue, msg, propsData }) {
  let Constructor = Vue.extend(Toast);
  let toast = new Constructor({ propsData });
  toast.$slots.default = [msg];
  toast.$mount();
  document.body.appendChild(toast.$el);
  return toast;
}
