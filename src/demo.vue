<template>
    <div style="padding: 20px;">
  <!--      <g-cascader :source.sync="source" gheight="160px;"
                    :selected.sync="selected"
        ></g-cascader>-->
        <div>
            <g-cascader :source.sync="source" gheight="160px;"
                        :selected.sync="selected"
                        :load-data="loadData"
            ></g-cascader>
        </div>
        <div>
            <g-cascader :source.sync="source" gheight="160px;"
                        :selected.sync="selected"
                        :load-data="loadData"
            ></g-cascader>
        </div>
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
            result.forEach(node=>{
             let flag =    db.filter(item=>{
                  return  item.parent_id==node.id;
                }).length>0;
                node.isLeaf = !flag;
            });
            success(result)
        },1000)

    })
}

export default {
    data() {
        return {
            selected: [],
            source:[],
            level:0
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
            ajax(this.selected[this.level].id).then(data => {
                let lastLevelSelected = this.source.filter(item => item.id === this.selected[0].id)[0]
                this.$set(lastLevelSelected, 'children', data)
            })
        }
    },
    created(){
        //动态
        ajax(0).then((data)=>{
            this.source=data;
        })
        //静态
      /*  this.source= [
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
        ]*/
    }
};
</script>
