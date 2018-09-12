/**
 * Created by Liqiaomiao on 2018/6/26.
 */
import Vue from 'vue'
import plugin from './plugin'
import Button from './button.vue'
import Icon from './icon.vue'
import ButtonGroup from './button-group.vue'
import Input from './Input.vue'
import Tabs from './tabs.vue'
import TabsHead from './tabs-head.vue'
import TabsBody from './tabs-body.vue'
import TabsItem from './tabs-item.vue'
import TabsPane from './tabs-pane.vue'

import Popover from './popover'
import Collapse from './collapse.vue'
import CollapseItem from './collage-item.vue'

import Cascader from './cascader.vue'

Vue.component('g-button',Button);
Vue.component('g-button-group',ButtonGroup);
Vue.component('g-cascader',Cascader);
Vue.component('g-collapse',Collapse);
Vue.component('g-collapse-item',CollapseItem);
Vue.component('g-icon',Icon);
Vue.component('g-input',Input);
Vue.component('g-popover',Popover);
Vue.component('g-tabs',Tabs);
Vue.component('g-tabs-body',TabsBody);
Vue.component('g-tabs-head',TabsHead);
Vue.component('g-tabs-item',TabsItem);
Vue.component('g-tabs-pane',TabsPane);
Vue.use(plugin);
new Vue({
    el:"#app",
    data:{
        loading:true,
        message:'456',
        selectedTab:['2'],
        source:[{
            name: '浙江',
            children: [
                {name: '杭州',
                    children:[
                        {name:'上城区'},
                        {name:'下城区'},
                        {name:'江干区'}
                    ]
                },
                {name: '嘉兴',
                    children:[
                        {name:'南湖区'},
                        {name:'秀洲区'},
                        {name:'嘉善区'}
                    ]
                }
            ]
        },{
            name:'福建',
            children:[
                {name:'福州市',
                    children:[
                        {name:'鼓楼区'},
                        {name:'台州区'},
                        {name:'苍山区'}
                    ]
                },

            ]
        }]
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
        },
        yyy(){
            console.log('yyy');
        }
    },
    mounted(){

    },

});

