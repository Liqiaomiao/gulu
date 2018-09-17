<template>
    <div class="cascader" >
        <div class="trigger" @click="popoverVisible=!popoverVisible">
        </div>
        <div class="popover-wraper" v-if="popoverVisible" :style="{height:height}">

            <cascader-item  :sourceItem="source"></cascader-item>

        </div>
    </div>
</template>

<script>
    import cascaderItem from './cascader-item.vue'
    export default{
        name:'GuluCascader',
        components:{
            cascaderItem
        },
        props:{
            source:{
                type:Array
            },
            height:{
                type:String
            }
        },
        data(){
            return {
                popoverVisible:true,
                level1Selected:null,
                level2Selected:null
            }
        },
        computed:{
            level2Items(){
                if(this.level1Selected){

                    return this.level1Selected.children
                }else{
                    return []
                }

            }
        }
    }
</script>
<style lang="scss" scoped>
@import "var.scss";
.cascader{
    .trigger{
        border:1px solid $border-color;
        width: 100px;
        height: 30px;
        border-radius: $border-radius;
    }
    .popover-wraper{
        position: absolute;
        height: 150px;
        display: flex;
         @extend .box-shadow;

    }
}
</style>


