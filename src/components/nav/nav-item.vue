<template>
    <div :class="{selected}" :data-name="name" @click="onClick" class="g-nav-item">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "GuluNavItem",
        inject:['root'],
        props:{
            name:{
                type:String,
                required:true
            },
        },
        data(){
            return {
                selected: false
            }
        },
        created() {
            this.root.addItem(this)
        },
        methods:{
            onClick(){
                this.root.pathName=[];
                this.$parent.updatePathName && this.$parent.updatePathName();
                this.$emit("update:selected",this.name);

            }
        }
    }
</script>

<style scoped lang="scss">
@import "var";
.g-nav-item {
    padding: 10px 20px;
    position: relative;
    &.selected {
        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            border-bottom: 2px solid $blue;
            width: 100%;
        }
    }
}
.g-sub-nav .g-nav-item {
    &.selected {
        color: $color;
        background: $gray;
        &::after {
            display: none;
        }
    }
}
</style>