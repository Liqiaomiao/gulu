<template>
    <div
            @mouseenter="onMouseEnter"
            @mouseleave="onMouseLeave"
            @touchend ="onTouchEnd"
            @touchmove="onTouchMove"
            @touchstart="ontTouchStart"
            class="g-slides">
        <div class="g-slides-window">
            <div class="g-slides-wrapper">
                <slot></slot>
            </div>

        </div>
        <div class="g-slides-dots">
            <span @click="select(selectedIndex-1)" data-action="prev"><g-icon name="left"></g-icon></span>
            <span :class="{active:n-1==selectedIndex}" @click="select(n-1)"
            :data-index="n"
                  :key="n" v-for="n in childrenLength "
            >{{n}}</span>
            <span @click="select(selectedIndex+1)"  data-action="next"><g-icon name="right"></g-icon></span>
        </div>
    </div>
</template>

<script>
    import GIcon from './icon'
    export default {
        name: "slides",
        components:{GIcon},
        props:{
            selected:{
                type:String
            },
            autoPlay:{
                type:Boolean,
                default:true
            },
            autoPlayDelay:{
                type:Number,
                default: 3000
            }
        },
        data(){
            return{
                childrenLength:0,
                lastSelectedIndex:0,
                timerId:undefined,
                touchStart:''
            }
        },
        computed:{
            selectedIndex(){
                let index = this.names.indexOf(this.selected);
                return index===-1?0:index;
            },
            names(){
                return  this.items.map(item=> item.name);
            },
            items(){

                return  this.$children.filter(vm=>vm.$options.name=='slidesItems' );
            }
        },
        mounted(){
            this.updateChildren();
            this.playAutomatically();
            this.childrenLength=this.items.length;
            this.lastSelectedIndex=this.names.indexOf(this.selected);
        },
        updated() {
            this.updateChildren()

        },
        methods:{
            onMouseEnter(){
                this.pause()
            },
            onMouseLeave(){
                this.playAutomatically()
            },
            ontTouchStart({touches}){
                this.touchStart= touches[0];
                this.pause()
            },
            onTouchMove(){},
            onTouchEnd({changedTouches}){

                let {clientX:x1,clientY:y1} = this.touchStart;
                let {clientX:x2,clientY:y2} = changedTouches[0];
                let bowstring = Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2));
                let rate = Math.abs(bowstring/(y2-y1));
                if(rate>2){//小于30°算是左右滑动；
                    x2>x1? this.select(this.selectedIndex-1):this.select(this.selectedIndex+1)
                }
                this.$nextTick(()=>{
                    this.playAutomatically();
                })
            },
            pause(){
                clearInterval(this.timerId);
                this.timerId=undefined;
            },
            playAutomatically(){
                if( !this.autoPlay){return}
                if(this.timerId){return}
                const names = this.names;
                let run = ()=>{
                    let index = names.indexOf(this.getSelected());
                    let nameIndex= index+1;

                    this.select(nameIndex);
                    this.timerId =  setTimeout(run,this.autoPlayDelay)
                };
              this.timerId =  setTimeout(run,this.autoPlayDelay);
            },
            getSelected(){
                let first =this.items[0];
               return  this.selected||first.name
            },
            updateChildren(){
                let selected = this.getSelected();
                let names = this.names;
                this.items.forEach(vm=>{
                 var   reverse =this.selectedIndex < this.lastSelectedIndex;//false不加reverse,向左移动
                    //if(this.timerId){//如果用户手动点的时候就不应该是无缝的
                        //确定向左移动的情况下，由最后一个到第一个
                        if(this.lastSelectedIndex === this.names.length-1 && this.selectedIndex==0){ reverse=false}
                        //确定向右移动的情况下
                        if(this.lastSelectedIndex ==0 && this.selectedIndex==this.names.length-1){reverse=true}
                  //  }

                    vm.reverse = reverse;
                    //确保在动画前reverse已经生效
                    this.$nextTick(()=> vm.selected=selected )
                })


            },
            select(nextIndex){
                let names = this.names;
                if(nextIndex===names.length){nextIndex=0}
                if(nextIndex===-1){nextIndex=names.length-1}
                this.$emit('update:selected',names[nextIndex]);
                this.lastSelectedIndex=this.selectedIndex;
            }
        }
    }
</script>

<style scoped lang="scss">
.g-slides{
    &-window{
        display: flex;
        overflow: hidden;
    }
    &-wrapper{ position: relative;width: 100%;}
    &-dots{
        padding: 8px 0;
        display: flex;
        justify-content: center;
        >span{
            width: 20px;
            height: 20px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            background: #ddd;
            border-radius: 50%;
            margin:0 8px;
            font-size: 12px;
            cursor: pointer;
            &.active{
                background: #000;
                color:#fff;
                cursor: default;}
        }
    }
}
</style>