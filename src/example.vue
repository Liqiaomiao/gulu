<template>
    <div style="padding: 20px;">
        <g-table
                :columns="columns"
                :data-source="dataSource"
                :order-by.sync="sortRules"
                :selectedItems.sync="selectedItems"
                @update:orderBy="x"
                bordered
                striped
                :loading="loading"
                height="300px"
                expend-prop = 'description'
        >
            <template  slot-scope="{ item }">
                <g-button @click="edit(item)">编辑</g-button>
                <g-button @click="check(item)">查看</g-button>
            </template>
        </g-table>
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
    import GPager from './components/pager/guluPager'
    import GTable from './components/table/table'
    import GButton from './components/button/Button'
export default {
    data() {
        return {
            currentPage: 20,
            selectedItems:[],
            columns:[
                {text:'姓名',field:'name',width:100},
                {text:'成绩',field:'score',width: 90},
                {text:'操作',field:'slot',width:150}
                ],
            sortRules:{
                name:'asc',
                score:'desc'
            },
            dataSource:[
                {id:1,name:'方方',score:100,description:'happy new year'},
                {id:2,name:'圆圆',score:99},
                {id:3,name:'钢铁侠',score:100},
                {id:4,name:'超人',score:99},
                {id:5,name:'方方',score:100},
                {id:6,name:'圆圆',score:99},
                {id:7,name:'钢铁侠',score:100},
                {id:8,name:'超人',score:99},
                ],
            loading:false

        };
    },
    components: {GPager,GTable, GButton},
    methods:{
        edit(item){
            console.log(item);
            alert(item.id)
        },
        check(item){
            alert(item.id)
        },
        x(){/* 模拟ajax排序*/
            this.loading=true;
            this.dataSource = this.dataSource.sort((a,b)=>{
                return a.score-b.score
            })
            setTimeout(()=>{
                this.loading=false;
            },1000)
        }
    },
    created() {
    }
};
</script>
