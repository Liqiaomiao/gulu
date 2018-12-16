<template>
    <div class="popover" @click="onClick" ref="popover">
        <div class="content-wrapper" v-if="visible" ref="contentWrapper" :class="{[`position-${position}`]:true}">
            <slot name="content"></slot>
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
              return ['top','bottom','left','right']
          }
      }
  },
  methods: {
      positionContent() {
          let {contentWrapper, triggerWrapper}=this.$refs;
          document.body.appendChild(contentWrapper);
          let {width, height, left, top} = triggerWrapper.getBoundingClientRect();
          let {height:heightc} = contentWrapper.getBoundingClientRect();
          const position = this.position;
          if (position === 'top') {
              contentWrapper.style.left = `${left + window.scrollX}px`;
              contentWrapper.style.top = `${top + window.scrollY}px`;
          } else if (position === 'bottom') {

              contentWrapper.style.left = `${left + window.scrollX}px`;
              contentWrapper.style.top = `${top + height + window.scrollY}px`;

          } else if (position === 'left') {
              contentWrapper.style.left = `${left + width + window.scrollX}px`;
              contentWrapper.style.top = `${top - Math.abs(heightc - height) / 2 + window.scrollY}px`;
          } else {
              contentWrapper.style.left = `${left + window.scrollX}px`;
              contentWrapper.style.top = `${top - Math.abs(heightc - height) / 2 + window.scrollY}px`;
          }

      },
    onClickDocument(e) {
      if (
        this.$refs.popover &&
        (this.$refs.contentWrapper === e.target ||
          this.$refs.contentWrapper.contains(e.target))
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
  }
};
</script>

<style scoped lang="scss">
    @import "var.scss";
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
         top: 100%;
         left: 10px;
     }
    &::after{
         border-top:10px solid #fff ;
         top: calc(100% - 2px);
         left: 10px;
     }
  }
  &.position-bottom{
    margin-top:10px;
    &::before{
         border-bottom:10px solid $border-color;
         bottom: 100%;
         left: 10px;
     }
    &::after{
         border-bottom:10px solid #fff ;
         bottom: calc(100% - 2px);
         left: 10px;
     }
  }
  &.position-left{

    margin-left:10px;
    &::before{
         border-right:10px solid $border-color;
         top: 50%;
         margin-top: -10px;
         right:100%;
     }
    &::after{
         border-right:10px solid #fff ;
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
         top: 50%;
         margin-top: -10px;
         left:100%;
     }
    &::after{
         border-left:10px solid #fff ;
         top: 50%;
         margin-top: -10px;
         left:calc(100% - 2px);
     }
}

}
</style>
