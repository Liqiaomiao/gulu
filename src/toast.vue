<template>
    <div class="toast" ref="wrapper">
        <div class="message">
            <slot v-if="!enableHTML"></slot>
            <div v-else v-html="$slots.default[0]"></div>
        </div>
        <template v-if="closeButton">
            <div class="line" ref="line"></div>
            <span class="close" @click="onClickClose">{{closeButton.text}}</span>
        </template>
    </div>
</template>
<script>
    export default{
        name:'toast',
        props:{
            autoClose:{
                type:Boolean,
                default:true
            },
            autoCloseDelay:{
                type:Number,
                default:5
            },
            closeButton:{
                type:Object,
                default:()=>({
                    text:'关闭',
                    callback:undefined
                })
            },
            enableHTML:{
                type:Boolean,
                default:false
            }
        },
        mounted(){
            this.execAutoClose();
            this.updateStyles();


        },
        methods:{
            updateStyles(){
                this.$nextTick(()=>{
                    this.$refs.line.style.height=`${this.$refs.wrapper.getBoundingClientRect().height}px`;
                })
            },
            execAutoClose(){
                if(this.autoClose){
                    setTimeout(()=>{
                        this.close()
                    },this.autoCloseDelay*1000)
                }
            },

            close(){
                this.$el.remove();
                this.$destroy();
            },
            log(){
                console.log('测试');
            },
            onClickClose(){
                this.close();
                if(this.closeButton && typeof  this.closeButton.callback==='function'){
                    this.closeButton.callback(this)
                }

            }
        },
        data(){
            return {}
        }
    }
</script>
<style scoped lang="scss">
    $font-size:14px;
    $min-height:40px;
    $toast-bg:rgba(0,0,0,.75);
    .toast{
        position: fixed;
        top:0;
        left: 50%;
        transform:translateX(-50%);
        font-size: $font-size;
        line-height: 1.8;
        min-height:  $min-height;
        display: flex;
        align-items: center;
        background: $toast-bg;
        color:#fff;
        border-radius: 4px;
        box-shadow: 0 0 3px 0 rgba(0,0,0,.5);
        padding: 0 16px;
        .message{
            padding: 8px 0;
        }
        .line{
            height: 100%;
            border-left: 1px solid #666 ;
            margin-left: 16px;
        }
        .close{
            padding-left: 16px;
            flex-shrink: 0;

        }
    }
</style>


