<template>
    <transition name="slide">
        <div :class="{reverse}" class="g-slides-items" v-if="visible">
            <slot></slot>
        </div>
    </transition>

</template>

<script>
    export default {
        name: "slidesItems",
        props:{
                name:{
                type:String,
                required:true
            }
        },
        data(){
            return {
                selected:'',
                reverse:false
            }
        },
        computed:{
            visible(){
                return this.name==this.selected
            }
        }
    }
</script>

<style scoped lang="scss">
    .slide-leave-active{
        width: 100%;
        height: 100%;
        position: absolute;
    }
 .slide-enter-active,.slide-leave-active{
     transition: all .5s;
 }
 .slide-enter{
     transform: translateX(100%) scale(.5);

 }
 .slide-leave-to{
     transform: translateX(-100%) scale(.5);
 }
 .slide-enter.reverse{
     transform: translateX(-100%);
 }
 .slide-leave-to.reverse{
     transform: translateX(100%) scale(.5);
 }
</style>