<template>
    <div class="wrapper" :class="toastClasses">
        <div class="toast" ref="wrapper" >
            <div class="message">
                <slot v-if="!enableHTML"></slot>
                <div v-else v-html="$slots.default[0]"></div>
            </div>
            <template v-if="closeButton">
                <div class="line" ref="line"></div>
                <span class="close" @click="onClickClose">{{closeButton.text}}</span>
            </template>
        </div>
    </div>

</template>
<script>
    export default{
        name:'toast',
        props:{
            autoClose:{
                type:Boolean,
                default:false
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
            },
            position:{
                type:String,
                default:'top',
                validate(value){
                    return ['top','bottom','middle'].indexOf(value)>=0
                }
            }
        },
        computed:{
            toastClasses(){
                return {
                    [`position-${this.position}`]:true
                }
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
    @keyframes fadeIn {
        0%{opacity: 0;transform: translateY(100%)}
        100%{opacity:1;transform: translateY(0%)}
    }
    .wrapper{
        position: fixed;
        left: 50%;
        transform:translateX(-50%);
        &.position-top{
             top:0
         }
        &.position-bottom{
             bottom:0;
         }
        &.position-middle{
             top:50%;
             transform: translate(-50%,-50%);
         }
        .toast{
            animation:fadeIn 1s;
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
    }

</style>


