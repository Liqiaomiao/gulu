<template>
    <div class="cascader">
        <div class="trigger" @click="popoverVisible=!popoverVisible">
        </div>
        <div  v-for="(item,index) in source">
            <cascader-item :sourceItem="item"></cascader-item>
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
                    console.log(this.level1Selected);
                    return this.level1Selected.children
                }else{
                    return []
                }

            },
            level3Items(){
                if(this.level2Selected){
                    return this.level2Selected.children
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
        border:1px solid red;
        width: 100px;
        height: 30px;
    }
    .popover{
        border:1px solid red;
        height: 150px;
        display: flex;
    }
}
</style>


