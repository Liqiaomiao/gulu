/**
 * Created by Liqiaomiao on 2018/7/15.
 */
const expect = chai.expect;
import Vue from 'vue'
import Input from '../src/Input'
Vue.config.productionTip = false
Vue.config.devtools = false

describe('Input', () => {

    it('存在.', () => {
        expect(Input).to.exist
    });
    const Constructor = Vue.extend(Input);
    let vm;

    describe('prop',()=>{
        afterEach(()=>{
            vm.$destroy()
        })
        it('接收value',()=>{

             vm = new Constructor({
                propsData:{
                    value:'1234'
                }
            }).$mount();
            const inputElement = vm.$el.querySelector('input');
            expect(inputElement.value).to.equal("1234");
        })
        it('接收disabled',()=>{
            vm = new Constructor({
                propsData:{
                    disabled:false
                }
            }).$mount();
            const inputElement = vm.$el.querySelector('input');
            expect(inputElement.disabled).to.equal(false);
        })
        it('接收readonly',()=>{
            vm = new Constructor({
                propsData:{
                    readOnly:false
                }
            }).$mount();
            const inputElement = vm.$el.querySelector('input');
            expect(inputElement.readOnly).to.equal(false);
        })
        it('接收error',()=>{
            vm = new Constructor({
                propsData:{
                    error:'你错了'
                }
            }).$mount();
            const useElement = vm.$el.querySelector('use');
            const errorMessage = vm.$el.querySelector('.errorMessage');
            expect(useElement.getAttribute("xlink:href")).to.equal("#i-error");
            expect(errorMessage.innerText).to.equal("你错了");
        })
    })
    describe('事件',()=>{
        afterEach(()=>{
            vm.$destroy()
        });
        it("支持change/input/blur/focus事件",()=>{
            ['change','input','blur','focus'].forEach((eventName)=>{
                vm = new Constructor({}).$mount();
                const callback = sinon.fake();
                vm.$on(eventName,callback);
                let event = new Event(eventName);
                Object.defineProperty(
                    event,
                    'target',
                    {
                        value:{value:'hi'},
                        enumerable:true
                    }
                )
                let inputElement = vm.$el.querySelector('input');
                inputElement.dispatchEvent(event);
                expect(callback).to.have.been.calledWith('hi')
            })
        });


    })

});