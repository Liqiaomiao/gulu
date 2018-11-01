<template>
    <div>
        <g-button>hello</g-button>
        {{selected}}
        <g-cascader :source="source" gheight="100px"  :selected="selected" @update:selected="onChangeSelected"></g-cascader>
    </div>
</template>
<style lang="scss">
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root {
        --button-height: 32px;
        --button-bg: white;
        --button-active-bg: #eee;
        --font-size: 14px;
        --border-radius: 4px;
        --color: #999;
        --border-color:#d9d9d9;
        --border-color-hover: #666;
    }

    body {
        font-size: var(--font-size);
    }

    #app {
        margin: 20px;
    }
</style>
<script>
import gButton from "./Button";
import gCascader from "./cascader.vue";
export default {
    data() {
        return {
            selected: [],
            source: [
                {
                    name: "浙江",
                    children: [
                        {
                            name: "杭州",
                            children: [
                                {name: "上城区"},
                                {name: "下城区"},
                                {name: "江干区"}
                            ]
                        },
                        {
                            name: "嘉兴",
                            children: [
                                {name: "南湖区"},
                                {name: "秀洲区"},
                                {name: "嘉善区"}
                            ]
                        }
                    ]
                },
                {
                    name: "福建",
                    children: [
                        {
                            name: "福州市",
                            children: [
                                {name: "鼓楼区"},
                                {name: "台州区"},
                                {name: "苍山区"}
                            ]
                        }
                    ]
                }
            ]
        };
    },
    components: {
        gButton,
        gCascader
    },
    methods:{
        onChangeSelected(copy){
            this.selected=copy
        }
    }
};
</script>
