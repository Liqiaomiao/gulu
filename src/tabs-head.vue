<template>
    <div class="tabs-head">
        <slot></slot>
        <slot name="actions">设置</slot>
    </div>
</template>

<script>
    export default {
        name: "GuluTabsHead"
    }
</script>

<style scoped>
    .tabs-head{

    }

</style>