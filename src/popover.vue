<template>
    <div class="popover" ref="popover">
        <div  ref="contentWrapper" class="content-wrapper" v-if="visible"
        :class="{[`position-${position}`]:true}"
        >
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
        props:{
            position:{
                type:String,
                default:'top',
                validator(value){
                    return ['top','left','bottom','right'].indexOf(value)>=0
                }
            },
            trigger:{
                typs:'String',
                default:'click',
                validator(value){
                    return ['click','hover'].indexOf(value)>=0
                }
            }

        },
        mounted(){
            if(this.trigger=='click'){
                this.$refs.popover.addEventListener('click',this.onClick)
            }else {
                this.$refs.popover.addEventListener('mouseenter',this.open)
                this.$refs.popover.addEventListener('mouseleave',this.close)
            }
        },
        methods:{
          positionContent(){

              let {contentWrapper, triggerWrapper} = this.$refs
              document.body.appendChild(this.$refs.contentWrapper)
              let {width, height, left, top} = triggerWrapper.getBoundingClientRect();
              let {width:width2,height:height2,left:left2,top:top2} = contentWrapper.getBoundingClientRect();
              let positions={
                  top:{
                      top:top + window.scrollY,left:left + window.screenX
                  },
                  bottom:{
                      top:top+height + window.scrollY,
                      left:left + window.screenX
                  },
                  left:{
                      top:top+height + window.scrollY,
                      left:left + window.screenX-width2
                  },
                  right:{
                      top:top +height+ window.scrollY,
                      left:left +width+ window.screenX
                  }

              }
              contentWrapper.style.left = positions[this.position].left+'px';
              contentWrapper.style.top = positions[this.position].top+'px'
          },
          onClickDocument(e){
              if(this.$refs.popover &&(this.$refs.popover===e.target || this.$refs.popover.contains(e.target))){
                  return
              }
              if(this.$refs.contentWrapper &&(this.$refs.contentWrapper===e.target || this.$refs.contentWrapper.contains(e.target))){
                  return
              }
              this.close()

          },
          open(){
              console.log('open',event.target);
              this.visible=true;
              this.$nextTick(()=>{
                  this.positionContent()
                  document.addEventListener('click',this.onClickDocument)
              })
          },
          close(){
              console.log('close',event.target);
              this.visible=false;
              document.removeEventListener('click',this.onClickDocument)
          },
          onClick(){
              if(this.$refs.triggerWrapper.contains(event.target)){
                  console.log(this.$refs.triggerWrapper, this.visible);
                  if(this.visible===true){
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
     &::before,&::after{
         content:'';
         display: block;
         border:10px solid transparent;
         width: 0;
         height: 0;
         position: absolute;
     }
     &.position-top{
        transform: translateY(-100%);
         margin-top: -10px;
         &::before,&::after{
             left:10px;
         }
         &::before{
             border-top-color: #000;
             top:100%
         }
         &::after{
             border-top-color: #fff;
             top:calc(100% - 1px)
         }
     }
     &.position-bottom{
         transform: translateY(0);
         margin-top: 10px;
         &::before,&::after{
             left:10px;
         }
         &::before{
             border-bottom-color: #000;
             bottom:100%
         }
         &::after{
             border-bottom-color: #fff;
             bottom:calc(100% - 1px)
         }
     }
     &.position-left{
         margin-left: -10px;
         margin-top: 10px;
         &::before,&::after{
            transform: translateY(-50%);
             top: 50%;
         }
         &::before{
             border-left-color: #000;
             left:100%
         }
         &::after{
             border-left-color: #fff;
             left:calc(100% - 1px)
         }
     }
     &.position-right{
         margin-left: 10px;
         margin-top: 10px;
         &::before,&::after{
             top:50%;
             transform: translateY(-50%);

         }
         &::before{
             border-right-color: #000;
             right:100%
         }
         &::after{
             border-right-color: #fff;
             right:calc(100% - 1px)
         }
     }

 }
</style>