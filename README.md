# hello

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your unit tests
```
yarn run test:unit
```

### cascader级联选择器使用
```
<g-cascader  
:source.sync="source" 
gheight="160px;"
:selected.sync="selected"
:load-data="loadData"></g-cascader>
<script>
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
```