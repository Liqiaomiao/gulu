<template>
    <div class="cascader">
        <div class="trigger" @click="popoverVisible=!popoverVisible">
        </div>
        <div class="popover" v-if="popoverVisible">
            <div class="level1" >
                <div class="label" v-for="(item1,index) in source" @click="level1Selected=item1">
                    {{item1.name}}
                </div>
            </div>
            <div class="level2" >
                <div class="label" v-for="(item2,index) in level2Items" @click="level2Selected=item2">
                    {{item2.name}}
                </div>
            </div>
            <div class="level3" >
                <div class="label" v-for="(item3,index) in level3Items">
                    {{item3.name}}
                </div>
            </div>
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


