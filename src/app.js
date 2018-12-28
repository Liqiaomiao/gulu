/**
 * Created by Liqiaomiao on 2018/6/26.
 */
import Vue from 'vue'
import plugin from './plugin'
import Button from './button/Button.vue'
import Icon from './icon.vue'
import ButtonGroup from './button/button-group.vue'
import Input from './Input.vue'
import Tabs from './tabs.vue'
import TabsHead from './tabs-head.vue'
import TabsBody from './tabs-body.vue'
import TabsItem from './tabs-item.vue'
import TabsPane from './tabs-pane.vue'

import Popover from './popover.vue'

Vue.component('g-button',Button);
Vue.component('g-icon',Icon);
Vue.component('g-button-group',ButtonGroup);
Vue.component('g-input',Input);

Vue.component('g-tabs',Tabs);
Vue.component('g-tabs-head',TabsHead);
Vue.component('g-tabs-body',TabsBody);
Vue.component('g-tabs-item',TabsItem);
Vue.component('g-tabs-pane',TabsPane);

Vue.component('g-popover',Popover);

Vue.use(plugin);
new Vue({
    el:"#app",
    data:{
        loading:true,
        message:'456',
        selectedTab:'sports'
    },
    methods:{
        inputChange(e,xxx){
            console.log(e,xxx)
        },
        showToast(){
            this.$toast(`你的智商为${parseInt(Math.random()*100)}`,{
                position:'bottom',
                autoClose:false,
                closeButton:{
                    text:"知道了",
                    callback(toast){
                        toast.log();
                        console.log('用户说他知道了');
                    }
                },

            })
        }
    },
    mounted(){

    },

});

