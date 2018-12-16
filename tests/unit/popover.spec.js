/**
 * Created by Liqiaomiao on 2018/12/16.
 */
import chai,{expect} from 'chai'
import {shallowMount,mount} from '@vue/test-utils'
import popover from '@/popover.vue'
import sinon from 'sinon';
import sinonChai from 'sinon-chai'
chai.use(sinonChai);
describe('popover.vue', () => {
    it('存在', () => {
        expect(popover).to.exist;
    });
    it("可以设置position",()=>{
        const wrapper = mount(popover,{
            slots:{
                default:'<button>点我</button>',
                content:'<div>弹出内容</div>'
            }
        });
        wrapper.find('button').trigger('click');
        let classes = wrapper.find('.content-wrapper').classes();
        expect(classes).to.include('content-wrapper')
    })

});
