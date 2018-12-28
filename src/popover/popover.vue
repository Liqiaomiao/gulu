<template>
    <div class="popover"  ref="popover">
        <div :class="{[`position-${position}`]:true}" class="content-wrapper" ref="contentWrapper" v-if="visible">
            <slot :close="close" name="content"></slot>
        </div>
        <span ref="triggerWrapper" style="display: inline-block">
            <slot></slot>
        </span>

    </div>

</template>

<script>
export default {
  name: "GuluPopover",
  data() {
    return {
      visible: false
    };
  },
  props:{
      position:{
          type:String,
          default:'top',
          validator(value){
              return ['top','bottom','left','right'].indexOf(value)>-1
          }
      },
      trigger:{
          type:String,
          default:'click',
          validator(value){
              return ['click','hover'].indexOf(value)>-1
          }
      }
  },

    methods: {
        positionContent() {
            let {contentWrapper, triggerWrapper}=this.$refs;
            document.body.appendChild(contentWrapper);
            let {width, height, left, top} = triggerWrapper.getBoundingClientRect();
            let {height:heightc} = contentWrapper.getBoundingClientRect();
            let x = {
                top: {
                    left: left + window.scrollX,
                    top: top + window.scrollY
                },
                bottom: {
                    left: left + window.scrollX,
                    top: top + height + window.scrollY
                },
                left: {
                    left: left + width + window.scrollX,
                    top: top - Math.abs(heightc - height) / 2 + window.scrollY
                },
                right: {
                    left: left + window.scrollX,
                    top: top - Math.abs(heightc - height) / 2 + window.scrollY
                }
            }
            const position = this.position;
            contentWrapper.style.left = x[this.position].left + 'px';
            contentWrapper.style.top = x[this.position].top + 'px'
        },
        onClickDocument(e) {
            if (
                this.$refs.popover &&
                (this.$refs.contentWrapper === e.target ||
                this.$refs.popover.contains(e.target))
            ) {
                return;
            }
            this.close();
        },
        open() {
            this.visible = true;
            this.$nextTick(() => {
                this.positionContent();
               document.addEventListener("click", this.onClickDocument);
            });
        },
        close() {
            this.visible = false;
            document.removeEventListener("click", this.onClickDocument);
        },
        onClick(event) {
            if (this.$refs.triggerWrapper.contains(event.target)) {
                if (this.visible) {
                    this.close();
                } else {
                    this.open();
                }
            }
        }

    },
    mounted(){
        if (this.trigger === 'click') {
            this.$refs.popover.addEventListener('click', this.onClick)
        } else {
            this.$refs.popover.addEventListener('mouseenter', this.open);
            this.$refs.popover.addEventListener('mouseleave', this.close)
        }
    },
    beforeDestroy(){
        if (this.trigger === 'click') {
            this.$refs.popover.removeEventListener('click', this.onClick)
        } else {
            this.$refs.popover.removeEventListener('mouseenter', this.open);
            this.$refs.popover.removeEventListener('mouseleave', this.close)
        }
    }
};
</script>

<style scoped lang="scss">
    @import "../var";
.popover {
  display: inline-block;
  vertical-align: top;
  position: relative;
}
.content-wrapper {
  position: absolute;
  border: 1px solid $border-color;
  border-radius: $border-radius;
  filter:drop-shadow(0 1px 1px rgba(0,0,0,.5));
  padding: 1em;

  background:#fff;
  max-width:20em;
  word-break:break-all;
    &::before,&::after{
         content:'';
         display: block;
         border: 10px solid transparent ;
         position: absolute;
     }
  &.position-top{
    transform: translateY(-100%);
    margin-top: -10px;
    &::before{
         border-top:10px solid $border-color;
         border-bottom: 0;
         top: 100%;
         left: 10px;
     }
    &::after{
         border-top:10px solid #fff ;
         border-bottom: 0;
         top: calc(100% - 2px);
         left: 10px;
     }
  }
  &.position-bottom{
    margin-top:10px;
    &::before{
         border-bottom:10px solid $border-color;
         border-top:0;
         bottom: 100%;
         left: 10px;
     }
    &::after{
         border-bottom:10px solid #fff ;
         border-top:0;
         bottom: calc(100% - 2px);
         left: 10px;
     }
  }
  &.position-left{

    margin-left:10px;
    &::before{
         border-right:10px solid $border-color;
         border-left:0;
         top: 50%;
         margin-top: -10px;
         right:100%;
     }
    &::after{
         border-right:10px solid #fff ;
         border-left:0;
         top: 50%;
         margin-top: -10px;
         right:calc(100% - 2px);
     }
  }
&.position-right{
    transform: translateX(-100%);
    margin-left:-10px;
    &::before{
         border-left:10px solid $border-color;
         border-right:0;
         top: 50%;
         margin-top: -10px;
         left:100%;
     }
    &::after{
         border-left:10px solid #fff ;
         border-right:0;
         top: 50%;
         margin-top: -10px;
         left:calc(100% - 2px);
     }
}

}
</style>
