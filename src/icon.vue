<style lang="scss">
    .icon {
        height: 1em;
        width: 1em;
    }
</style>
<template>
    <div>
        <svg v-if="name" class="icon">
            <use :xlink:href="`#i-${name}`"></use>
        </svg>
    </div>
</template>

<script>
    export default{
        props:['name']
    }
</script>
