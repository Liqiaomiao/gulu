<template>
    <div class="collapseItem">
        <div class="title" @click="toggle">{{title}}</div>
        <div class="content" v-if="open">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default{
        name:'GuluCollapseItem',
        data(){
            return {
                open:false,
            }
        },
        props:{
            title:{
                type:String,
                required:true
            },

        },
        inject:['eventBus'],
        mounted(){
            this.eventBus &&   this.eventBus.$on("update:selected",(vm)=>{
               if(vm!==this){
                   this.close()
               }
            })
        },
        methods:{
            toggle(){
                if(this.open){
                    this.open=false;
                }else{
                    this.open=true;
                    this.eventBus &&  this.eventBus.$emit('update:selected',this)
                }
            },
            close(){
                this.open=false;
            }
        }
    }
</script>
<style scoped lang="scss">
    $gray:#ddd;
    $border-radius:4px;
.collapseItem{
>.title{
     border-bottom: 1px solid $gray;
     min-height: 32px;
     display: flex;
     align-items: center;
     padding:0 8px;
 }
 .content{
     padding:8px;
     border-bottom: 1px solid $gray;
 }
 &:first-child{
    >.title{
         border-top-left-radius: $border-radius;
         border-top-right-radius: $border-radius ;

     }
  }
 &:last-child{
      >.title:last-child{
          border-bottom: 0;
       }
       >.content:last-child{
            border-bottom: 0;
        }
  }


}
</style>

