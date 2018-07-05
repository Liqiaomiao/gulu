<template>
    <div class="g-button-group">
        <slot></slot>
    </div>
</template>

<script>
    export default{
        data(){
            return {}
        }
    }
</script>
<style lang="scss">
.g-button-group{
    display: inline-flex;
    vertical-align: middle;
    & >button{
         margin-left:-1px;
        border-radius: 0;
        &:hover{
            border: 1px solid #40a9ff;
            position: relative;
            z-index: 1;
            transition: 2s;
         }
       }
    & >button:first-child{
        border-top-left-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
       }
    & >button:last-child{
           border-top-right-radius: var(--border-radius);
           border-bottom-right-radius: var(--border-radius);
       }

}

</style>
