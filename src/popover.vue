<template>
    <div class="popover" @click.stop="xxx">
        <div class="content-wrapper" v-if="visible" ref="contentWrapper">
            <slot name="content"></slot>
        </div>
        <span ref="triggerWrapper">

        </span>
        <slot></slot>
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
            xxx(){
                this.visible = !this.visible

                if(this.visible){
                    this.$nextTick(()=>{
                        document.body.appendChild(this.$refs.contentWrapper)
                        let {width,height,top,left}=this.$refs.triggerWrapper.getBoundingClientRect();
                        this.$refs.contentWrapper.style.left = `${left+window.scrollX}px`
                        this.$refs.contentWrapper.style.top=`${top+window.scrollY}px`
                    })

                    document.addEventListener('click',()=>{
                        this.visible=false;
                    })
                    console.log('document hide');
                }else{
                    console.log('button hide');
                }
            }
        }
    }
</script>

<style scoped lang="scss">
 .popover{
     display: inline-block;
     vertical-align: top;
     position: relative;

 }
 .content-wrapper{
     position: absolute;
     border:1px solid red;
     box-shadow: 0 0 3px rgba(0,0,0,.5);
     transform: translateY(-100%);
 }
</style>