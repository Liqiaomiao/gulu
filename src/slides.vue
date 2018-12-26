<template>
    <div @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" class="g-slides">
        <div class="g-slides-window">
            <div class="g-slides-wrapper">
                <slot></slot>
            </div>

        </div>
        <div class="g-slides-dots">
            <span :class="{active:n-1==names.indexOf(selected)}" @click="select(n-1)"
            v-for="n in childrenLength ">{{n}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "slides",
        props:{
            selected:{
                type:String
            },
            autoPlay:{
                type:Boolean,
                default:true
            }
        },
        data(){
            return{
                childrenLength:0,
                lastSelectedIndex:0,
                timerId:undefined
            }
        },
        computed:{
            selectedIndex(){
                return this.names.indexOf(this.selected)
            },
            names(){
                return   this.$children.map(item=> item.name);
            }
        },
        mounted(){
            this.updateChildren();
            this.playAutomatically();
            this.childrenLength=this.$children.length;
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
            pause(){
                clearInterval(this.timerId);
                this.timerId=undefined;
            },
            playAutomatically(){
                if(this.timerId){return}
                const names = this.names;
                let run = ()=>{
                    let index = names.indexOf(this.getSelected());
                    let nameIndex= index+1;
                    if(nameIndex===names.length){nameIndex=0}
                    if(nameIndex===-1){nameIndex=names.length-1}
                    this.select(nameIndex);
                    this.timerId =  setTimeout(run,3000)
                };
              this.timerId =  setTimeout(run,3000);
            },
            getSelected(){
                let first =this.$children[0];
               return  this.selected||first.name
            },
            updateChildren(){
                let selected = this.getSelected();
                let names = this.names;
                this.$children.forEach(vm=>{
                 var   reverse =this.selectedIndex < this.lastSelectedIndex;//false不加reverse,向左移动
                    if(this.timerId){//如果用户手动点的时候就不应该是无缝的
                        //确定向左移动的情况下，由最后一个到第一个
                        if(this.lastSelectedIndex === this.names.length-1 && this.selectedIndex==0){ reverse=false}
                        //确定向右移动的情况下
                        if(this.lastSelectedIndex ==0 && this.selectedIndex==this.names.length-1){reverse=true}
                    }

                    vm.reverse = reverse;
                    //确保在动画前reverse已经生效
                    this.$nextTick(()=> vm.selected=selected )
                })


            },
            select(val){
                this.$emit('update:selected',this.names[val]);
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