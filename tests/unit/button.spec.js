import chai,{expect} from 'chai'
import {shallowMount,mount} from '@vue/test-utils'
import Button from '@/Button.vue'
import sinon from 'sinon';
import sinonChai from 'sinon-chai'
chai.use(sinonChai);
describe('Button.vue', () => {
    it('存在', () => {
        const wrapper = shallowMount(Button,{
            propsData:{icon:'settings'}
        });
        expect(Button).to.exist;
        expect(1).to.eq(1)
    })
    it('可以设置icon.', () => {
        const wrapper = mount(Button,{
            propsData:{
                icon: 'settings'
            }
        });
        const useElement = wrapper.find('use')
        expect(useElement.attributes('href')).to.equal('#i-settings')
    })
    it('可以设置loading.', () => {
        const wrapper = mount(Button,{
            propsData:{
                icon: 'settings',
                loading: true
            }
        })
        const useElements = wrapper.find('use');
        expect(useElements.attributes('href')).to.equal('#i-loading')
    })
    xit('icon 默认的 order 是 1', () => {
        const div = document.createElement('div')
        document.body.appendChild(div)
        const wrapper= mount(Button,{
            propsData: {
                icon: 'settings',
            }
        })
        const icon = wrapper.find('svg')
        expect(getComputedStyle(icon).order).to.eq('1')
    })
    xit('设置 iconPosition 可以改变 order', () => {
        const div = document.createElement('div')
        document.body.appendChild(div)
        const wrapper= mount(Button,{
            propsData: {
                icon: 'settings',
                iconPosition: 'right'
            }
        })
        const icon = wrapper.find('svg')
        expect(getComputedStyle(icon).order).to.eq('2')
    })
    it('点击 button 触发 click 事件', () => {
        const wrapper= mount(Button,{
            propsData: {
                icon: 'settings',
            }
        });
        const callback = sinon.stub();
        wrapper.vm.$on('click', callback);
        wrapper.trigger('click');
        expect(callback).to.have.been.called
    })
});
