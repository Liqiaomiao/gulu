<template>
    <div style="padding: 20px;">
        <g-slides :selected.sync="selected">
            <g-slides-items name="hello"><div class="box">1</div></g-slides-items>
            <g-slides-items name="world"><div class="box">2</div></g-slides-items>
            <g-slides-items name="3"><div class="box">3</div></g-slides-items>
        </g-slides>
    </div>
</template>
<style lang="scss">
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .box{
        width: 100%;
        height: 400px;
        background: #ddd;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30px;
    }

</style>
<script>
import GSlides from './slides'
import GSlidesItems from './slidesItems'
export default {
    data() {
        return {
            selected:undefined
        };
    },
    components: {
        GSlides,
        GSlidesItems
    },
    methods:{
    },
    created() {
    },
    watch:{
    }
};
</script>
