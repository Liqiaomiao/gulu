/**
 * Created by Liqiaomiao on 2018/6/26.
 */
import Vue from 'vue'
import Button from './button.vue'
import Icon from './icon.vue'
import ButtonGroup from './button-group.vue'
Vue.component('g-button',Button);
Vue.component('g-icon',Icon);
Vue.component('g-button-group',ButtonGroup);
new Vue({
    el:"#app",
    data:{
        loading:true
    }
});
//单元测试
import chai from 'chai'
import spies from 'chai-spies'
chai.use(spies)
const expect = chai.expect;
{
    const Constructor = Vue.extend(Button);
    const vm = new Constructor({
        propsData:{
            icon:"settings"
        }
    });
    vm.$mount();
    let useElement = vm.$el.querySelector('use');
    expect(useElement.getAttribute('xlink:href')).to.equal('#i-settings');
    vm.$el.remove();
    vm.$destroy();
}
{
    const Constructor = Vue.extend(Button);
    const vm = new Constructor({
        propsData:{
            icon:"settings",
            loading:true
        }
    });
    vm.$mount();
    let useElement = vm.$el.querySelector('use');
    let href = useElement.getAttribute('xlink:href');
    expect(href).to.eq("#i-loading");

}
{
    const Constructor = Vue.extend(Button)
    const vm = new Constructor({
        propsData:{
            icon:'settings'
        }
    })
    const div = document.createElement('div');
    document.body.appendChild(div)
    vm.$mount(div)
    let svg= vm.$el.querySelector('svg')
    let {order} = window.getComputedStyle(svg);
    expect(order).to.eq("1")
    vm.$el.remove()
    vm.$destroy()
}
{
    const Constructor = Vue.extend(Button);
    const vm = new Constructor({
        propsData:{
            icon:"settings",
            iconPosition:"right"
        }
    });
    const div = document.createElement("div");
    document.body.appendChild(div)
    vm.$mount(div)
    let svg= vm.$el.querySelector('svg')
    let {order} = window.getComputedStyle(svg)
    expect(order).to.eq('2')
    vm.$el.remove()
    vm.$destroy()
}
{ //mock
    const Constructor = Vue.extend(Button)
    const vm = new Constructor({
        propsData:{
            icon:'settings'
        }
    })
    vm.$mount()
    let spy = chai.spy(function () {

    })
    vm.$on('click',spy)
    let button = vm.$el
    button.click()
    expect(spy).to.have.been.called()
}