<style lang="scss">
    .g-button{
        height:var(--button-height);
        font:inherit;
        border-radius: var(--border-radius);
        border:1px solid var(--border-color);
        background: var(--button-bg);
        padding: 0 1em;
        &:hover{
            border-color: var(--border-color-hover);
         }
        &:active{
             background: var(--button-active-bg);
        }
        &:focus{
             outline: none;
        }
    }
</style>
<template>
    <div>
        <button class="g-button">按钮</button>
    </div>
</template>

<script>
    export default{
        data(){
            return {}
        }
    }
</script>
