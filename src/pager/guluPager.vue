<template>
    <div class="gulu-pager">
        <span v-for="(item,index) in pages">{{item}}</span>
    </div>
</template>

<script>
    export default{
        name:'GuluPager',
        props:{
            totalPage:{
                type:Number,
                reqired:true
            },
            currentPage:{
                type:Number,
                required:true
            },
            hideIfOnePage:{
                type:Boolean,
                default:true
            }
        },
        data(){
            let pages = [1,this.currentPage,this.currentPage-1,this.currentPage+1,this.currentPage-2,this.currentPage+2,this.totalPage];
            pages.sort((a,b)=>a-b);

            pages = unique(pages);
            pages = pages.reduce((prev,next,index,arr)=>{
                if(arr[index+1]!=undefined && arr[index+1]-arr[index]>1){
                    prev.push(next)
                    prev.push('...')
                }else{
                    prev.push(next)
                }
                return prev
            },[]);
            return {
                pages
            }
        },
        mounted(){

        }
    }
    function unique(arr) {
        return [...new Set(arr)]
        /*    let obj = {};
            arr.map(item=>{
                obj[item]=true
            });
            return Object.keys(obj)*/
    }
</script>
<style scoped lang='scss'>
.gulu-pager{
    span{margin:  0 5px;}
}
</style>

