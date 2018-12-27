import chai,{expect} from 'chai'
import {shallowMount,mount} from '@vue/test-utils'
import GSlides from '@/slides.vue'
import GSlidesItems from '@/slidesItems.vue'
import GIcon from '@/icon'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'
import Vue from 'vue'
chai.use(sinonChai);
describe('GSlides.vue', () => {
    it('存在.',()=>{
        expect(GSlides).to.exist
    });
    it('接受GSlidesItems,默认展示第一个',(done)=>{
      Vue.component('GSlidesItems',GSlidesItems);
        const wraper= mount(GSlides,{
            slots:{
                defautl:`
            <g-slides-items name="1"><div class="box1">1</div></g-slides-items>
            <g-slides-items name="2"><div class="box2">2</div></g-slides-items>
            <g-slides-items name="3"><div class="box3">3</div></g-slides-items>
            `
            },
            propsData:{
                selected:undefined,
                autoPlay:false
            }
        });
        setTimeout(()=>{
            expect(wraper.find('.box1').exists()).to.be.true
             done();
        })
    });
    it('selected 是几，选中的就是几',(done)=>{
        Vue.component('GSlidesItems',GSlidesItems);
        const wrapper = mount(GSlides,{
            propsData:{
                autoPlay:false,
                selected:'2'
            },
            slots:{
                default:`
                 <g-slides-items name="1"><div class="box1">1</div></g-slides-items>
                <g-slides-items name="2"><div class="box2">2</div></g-slides-items>
                <g-slides-items name="3"><div class="box3">3</div></g-slides-items>
                `
            }
        });
        setTimeout(()=>{
            expect(wrapper.find('.box2').exists()).to.be.true;
            done();
        })
    });
    it('点击第二个就展示第二个',(done)=>{
        Vue.component('GSlidesItems',GSlidesItems);
        const wrapper = mount(GSlides,{
            propsData:{
                autoPlay:false,
                selected:'1'
            },
            slots:{
                defautle:`
                <g-slides-items name="1"><div class="box1">1</div></g-slides-items>
                <g-slides-items name="2"><div class="box2">2</div></g-slides-items>
                <g-slides-items name="3"><div class="box3">3</div></g-slides-items>
                `
            },
            listeners:{
                'update:selected'(x){
                    expect(x).to.eq('2');
                    done();
                }
            }
        });
        setTimeout(()=>{
            wrapper.find('[data-index="2"]').trigger("click")
        })
    })
    it('会自动播放',(done)=>{
        Vue.component('GSlidesItems',GSlidesItems);
        const callback = sinon.fake();
        const wrapper = mount(GSlides,{
            propsData:{
                autoPlay:true,
                autoPlayDelay:20,
                selected:'2'
            },
            slots:{
               default:`
                <g-slides-items name="1"><div class="box1">1</div></g-slides-items>
                <g-slides-items name="2"><div class="box2">2</div></g-slides-items>
                <g-slides-items name="3"><div class="box3">3</div></g-slides-items>
               `
            },
            listeners:{
                'update:selected':callback
            }
        });
        setTimeout(()=>{
            expect(callback).to.have.been.calledWith('3');
            done()
        },21)

    });
    it('可以点击上一张',(done)=>{
        let callback = sinon.fake();
        Vue.component('GSlidesItems',GSlidesItems);
        const wrapper = mount(GSlides,{
            propsData:{
                autoPlay:true,
                autoPlayDelay:20,
                selected:'2'
            },
            slots:{
                default:`
                <g-slides-items name="1"><div class="box1">1</div></g-slides-items>
                <g-slides-items name="2"><div class="box2">2</div></g-slides-items>
                <g-slides-items name="3"><div class="box3">3</div></g-slides-items>
                `
            },
            listeners:{
                'update:selected':callback
            }
        })
        setTimeout(()=>{
            wrapper.find('[data-action="prev"]').trigger('click');
            expect(callback).to.have.been.calledWith('1');
            done()
        },21)
    })
    it('可以点击下一张',(done)=>{
        let callback = sinon.fake();
        Vue.component('GSlidesItems',GSlidesItems);
        const wrapper = mount(GSlides,{
            propsData:{
                autoPlay:true,
                autoPlayDelay:20,
                selected:'2'
            },
            slots:{
                default:`
                <g-slides-items name="1"><div class="box1">1</div></g-slides-items>
                <g-slides-items name="2"><div class="box2">2</div></g-slides-items>
                <g-slides-items name="3"><div class="box3">3</div></g-slides-items>
                `
            },
            listeners:{
                'update:selected':callback
            }
        })
        setTimeout(()=>{
            wrapper.find('[data-action="next"]').trigger('click');
            expect(callback).to.have.been.calledWith('3');
            done()
        },21)
    })

});