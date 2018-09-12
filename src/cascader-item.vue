<template>
    <div class="cascaderItem">
        {{sourceItem.name}}
        <cascader-item
                v-if="sourceItem.children"
                v-for="(item,index) in sourceItem.children"
                :sourceItem="item"
        ></cascader-item>
    </div>
</template>
<style>
.cascaderItem{
    border: 1px solid red;
    margin: 10px;
}
</style>
<script>
    export default{
        name:'cascaderItem',
        props:{
            sourceItem:{
                type:Object
            }
        },
        data(){
            return {}
        }
    }
</script>


