<template>
    <div :class="{active}" class="g-sub-nav">
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
        inject:['root'],
        props:{
            name:{
                type:String,
                required:true
            }
        },
        data(){
            return {
                open:false,

            }
        },
        computed:{
            active(){
                return this.root.pathName.indexOf(this.name)>-1?true:false
            }
        },
        methods:{
            updatePathName(){
                this.root.pathName.unshift(this.name)
                this.$parent.updatePathName && this.$parent.updatePathName();

            }
        }
    }
</script>

<style scoped lang="scss">
    @import "var";
    .g-sub-nav {
        position: relative;
        &.active {
            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                border-bottom: 2px solid $blue;
                width: 100%;
            }
        }
        &-label { padding: 10px 20px; display: block; }
        &-icon { display: none; }
        &-popover {
            background: white;
            position: absolute;
            top: 100%;
            left: 0;
            margin-top: 4px;
            white-space: nowrap;
            box-shadow: 0 0 3px fade_out(black, 0.8);
            border-radius: $border-radius;
            font-size: $font-size;
            color: $light-color;
            min-width: 8em;
        }
    }
    .g-sub-nav .g-sub-nav {
        /*&.active {*/
            /*&::after {*/
                /*display: none;*/
            /*}*/
        /*}*/
        .g-sub-nav-popover {
            top: 0;
            left: 100%;
            margin-left: 8px;
        }
        .g-sub-nav-label {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .g-sub-nav-icon {
            transition: transform 250ms;
            display: inline-flex; margin-left: 1em;
            svg {fill: $light-color;}
            &.open {
                transform: rotate(180deg);
            }
        }
    }
</style>