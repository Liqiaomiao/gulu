<style lang="scss">
    .icon {
        height: 1em;
        width: 1em;
    }
</style>
<template>
        <svg v-if="name" class="icon">
            <use :xlink:href="`#i-${name}`"></use>
        </svg>

</template>

<script>
    import './svg'
    export default{
        props:['name']
    }
</script>
