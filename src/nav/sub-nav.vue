<template>
    <div class="g-sub-nav">
       <span @click="open=!open" class="g-sub-nav-label">
           <slot name="title"></slot>
       </span>
       <div class="g-sub-nav-popover" v-show="open">
           <slot></slot>
       </div>
    </div>
</template>

<script>
    export default {
        name: "GuluSubNav",
        data(){
            return {
                open:false
            }
        }
    }
</script>

<style scoped lang="scss">
.g-sub-nav{
    position: relative;

    span{
        padding: 10px 20px;
        display: block;
    }
    &-popover{
        position: absolute;
        top:100%;
        left: 0;
        white-space: nowrap;
        border: 1px solid #000;
        .g-sub-nav-popover{
            left: 100%;
            top:0;
        }
     }
}
</style>