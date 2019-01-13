<template>
    <div style="padding: 20px;">
        <g-pager :current-page.sync="currentPage" :total-page="20"></g-pager>
    </div>
</template>
<style lang="scss">
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;

    }
</style>
<script>
    import GPager from './pager/guluPager'
export default {
    data() {
        return {
            currentPage: 20
        };
    },
    components: {GPager},
    methods:{

    },
    created() {
    }
};
</script>
