<template>
    <div class="cascaderItem">
        <div class="left" >
            <div class="label" v-for="(items,index) in sourceItem" @click="leftSelected=items">
                {{items.name}}
            </div>
        </div>
        <div class="right" v-if="rightItems&&rightItems.length>0"  >
            <cascader-item :sourceItem="rightItems">
            </cascader-item>
        </div>
    </div>
</template>
<style>
.cascaderItem{
    border: 1px solid red;
  display: flex;
}
</style>
<script>
    export default{
        name:'cascaderItem',
        props:{
            sourceItem:{
                type:Array
            }
        },
        data(){
            return {
                leftSelected:null,
            }
        },
        computed:{
            rightItems(){
                if(this.leftSelected){
                    return this.leftSelected.children
                }else{
                    return []
                }

            }
        }
    }
</script>


