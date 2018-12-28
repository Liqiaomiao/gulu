/**
 * Created by Liqiaomiao on 2018/6/26.
 */
import Vue from "vue";
import plugin from "./plugin";

Vue.use(plugin);
import Demo from "@/demo.vue";
new Vue({
  render: h => h(Demo)
}).$mount("#app");
