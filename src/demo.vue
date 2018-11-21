<template>
    <div style="padding: 20px;">
        <g-cascader :source="source" gheight="100px"
                    :selected.sync="selected"
                    @update:selected="xxx"
                    :load-data="loadData"
        ></g-cascader>
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
        font-size: 14px;
    }

    #app {
        margin: 20px;
    }
</style>
<script>
import gButton from "./Button";
import gCascader from "./cascader.vue";
import db from './db'
/*function ajax1(parentId=0,success,fail) {
    let id=setTimeout(()=>{
        let result =  db.filter(item=>item.parent_id===parentId);
        success(result)
    },3000)
   return id
}*/
function ajax(parentId=0,success,fail) {
    return new Promise((success,fail)=>{
        setTimeout(()=>{
            let result =  db.filter(item=>item.parent_id===parentId);
            success(result)
        },2000)

    })
}

export default {
    data() {
        return {
            selected: [],
            source:[]
        };
    },
    components: {
        gButton,
        gCascader
    },
    methods:{

        onChangeSelected(copy){
            this.selected=copy
        },
        loadData(node,fn){
            let id = node.id;
            ajax(id).then(result=>{
                fn(result)
            })
        },
        xxx(copy){
            ajax(this.selected[0].id).then(data => {
                let lastLevelSelected = this.source.filter(item => item.id === this.selected[0].id)[0]
                this.$set(lastLevelSelected, 'children', data)
            })
        }
    },
    created(){
        ajax(0).then((data)=>{
            this.source=data;
        })
    }
};
</script>
