<template>
    <div style="padding: 20px;">
        {{selected}}
        <g-table :columns="columns" :data-source="dataSource" @changeItem="x" bordered striped></g-table>
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
    import GTable from './table/table'
export default {
    data() {
        return {
            currentPage: 20,
            selected:[],
            columns:[
                {text:'姓名',field:'name'},
                {text:'成绩',field:'scour'},
                ],
            dataSource:[
                {id:1,name:'方方',scour:100},
                {id:1,name:'圆圆',scour:99},
                {id:1,name:'钢铁侠',scour:100},
                {id:1,name:'超人',scour:99},
                ]
        };
    },
    components: {GPager,GTable},
    methods:{
        x(object){
            let {selected,item,index}=object;
            if(selected){
                this.selected.push(item)
            }else{
                this.selected.splice(index,1)
            }
        }
    },
    created() {
    }
};
</script>
