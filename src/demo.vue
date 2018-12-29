<template>
    <div style="padding: 20px;">
        <g-nav :selected.sync = "selected" >
            <g-nav-item name="home">首页</g-nav-item>
            <g-sub-nav name="about">
                <template slot="title">关于</template>
                <g-nav-item name="1">关于我们</g-nav-item>
                <g-nav-item name="2">招聘信息</g-nav-item>
                <g-sub-nav name="3">
                    <template slot="title">联系方式</template>
                    <g-nav-item name="3-1">微信</g-nav-item>
                    <g-nav-item name="3-2">QQ</g-nav-item>
                    <g-sub-nav name="3-3">
                        <template slot="title">手机</template>
                        <g-nav-item name="3-3-1">移动</g-nav-item>
                        <g-nav-item name="3-3-2">联通</g-nav-item>
                    </g-sub-nav>
                </g-sub-nav>
            </g-sub-nav>
            <g-nav-item name="hire">招聘</g-nav-item>
        </g-nav>
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
import GNav from './nav/nav'
import GNavItem from './nav/nav-item'
import GSubNav from './nav/sub-nav'
export default {
    data() {
        return {
            selected:'home'
        };
    },
    components: {GSubNav, GNav, GNavItem},
    methods:{
        onchange(val){
            console.log(val)
        }
    },
    created() {
    }
};
</script>
