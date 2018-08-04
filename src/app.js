/**
 * Created by Liqiaomiao on 2018/6/26.
 */
import Vue from 'vue'
import plugin from './plugin'
import Button from './button.vue'
import Icon from './icon.vue'
import ButtonGroup from './button-group.vue'
import Input from './Input.vue'
Vue.use(plugin);
Vue.component('g-button',Button);
Vue.component('g-icon',Icon);
Vue.component('g-button-group',ButtonGroup);
Vue.component('g-input',Input);
new Vue({
    el:"#app",
    data:{
        loading:true,
        message:'456'
    },
    methods:{
        inputChange(e,xxx){
            console.log(e,xxx)
        }
    },
    mounted(){
        this.$toast('abc')
    }
});

