<template>
    <div class="popover" @click="onClick" ref="popover">
        <div class="content-wrapper" v-if="visible" ref="contentWrapper">
            <slot name="content"></slot>
        </div>
        <span ref="triggerWrapper">
            <slot></slot>
        </span>

    </div>

</template>

<script>
    export default {
        name: "GuluPopover",
        data(){
            return{
                visible:false
            }
        },
        methods:{
          positionContent(){
            document.body.appendChild(this.$refs.contentWrapper)
            let {width,heigth,left,top} = this.$refs.triggerWrapper.getBoundingClientRect();
              this.$refs.contentWrapper.style.left= `${left+window.screenX}px`
            this.$refs.contentWrapper.style.top= `${top+window.scrollY}px`
          },
          onClickDocument(e){
              if(this.$refs.contentWrapper &&(this.$refs.contentWrapper===e.target || this.$refs.contentWrapper.contains(e.target))){
                  return
              }
              this.close()

          },
          open(){
              this.visible=true;
              this.$nextTick(()=>{
                  this.positionContent()
                  document.addEventListener('click',this.onClickDocument)
              })
          },
          close(){
              this.visible=false;
              document.removeEventListener('click',this.onClickDocument)
          },
          onClick(){
              if(this.$refs.triggerWrapper.contains(event.target)){
                  if(this.visible){
                      this.close()
                  }else{
                      this.open()
                  }
              }
          }
        }
    }
</script>

<style scoped lang="scss">
    $border-color:#333;
    $border-radius:4px;
 .popover{
     display: inline-block;
     vertical-align: top;
     position: relative;

 }
 .content-wrapper{
     position: absolute;
     transform: translateY(-100%);
     border:1px solid $border-color;
     border-radius: $border-radius;
     filter:drop-shadow(0 1px 1px rgba(0,0,0,.5));
     background: #fff;
     margin-top: -10px;
     padding: .5em 1em;
     max-width: 20em;
     word-break: break-word;
     &:before,&:after{
         content:'';
         display: block;
         border:10px solid transparent;
         width: 0;
         height: 0;
         position: absolute;
         left: 10px;

     }
     &::before{
         border-top-color:black;
         top: 100%;
     }
     &::after{
         border-top-color:#fff;
         top: calc(100% - 1px);
     }

 }
</style>