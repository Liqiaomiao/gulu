<template>
    <div>
        <button class="g-button" :class="{[`icon-${iconPosition}`]:true}" @click="$emit('click')">
            <g-icon v-if="icon&&!loading" :name="icon"></g-icon>
            <g-icon v-if="loading" class="loading" name="loading"></g-icon>
            <div class="content">
                <slot></slot>
            </div>

        </button>
    </div>
</template>

<script>
    export default{
        props:{
            icon:{},
            loading:{
                type:Boolean,
                default:false
            },
            iconPosition:{
                type:String,
                default:'left',
                validator(value){
                    return value == 'left' || value == 'right';
                }
            }
        }
    }
</script>
<style lang="scss" >
    @keyframes spin{
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
    .loading{
        width: 1em;
        height: 1em;
        animation:spin  2s infinite linear;
    }
    .g-button{
        vertical-align: middle;
        height:var(--button-height);
        font:inherit;
        border-radius: var(--border-radius);
        border:1px solid var(--border-color);
        background: var(--button-bg);
        padding: 0 1em;
        display: inline-flex;
        justify-content: center;
        vertical-align: middle;
        align-items: center;
        padding:0 1em;

    &:hover{
         border-color: var(--border-color-hover);
     }
    &:active{
         background: var(--button-active-bg);
     }
    &:focus{
         outline: none;
     }
    > .icon{
          order:1;
          margin-right: .1em;
      }
    > .content{
          order:2
      }
    &.icon-right{
    > .icon{
          order:2;
          margin-right:0;
          margin-left:.1em
      }
    > .content{
          order:1
      }
    }
    }
</style>