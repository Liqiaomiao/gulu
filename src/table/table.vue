<template>
    <div class="gulu-table-wrapper" ref="wrapper">
        <div :style="{ height:height }"  style="overflow: auto" >
            <table :class="{bordered,striped,compact}" class="gulu-table"  ref="table" >
                <thead>
                <tr>
                    <th width="50"></th>
                    <th width="50" ><input :checked="areAllItemsSelected" @change="onChangeAllItems" ref="allChecked"
                               type="checkbox"></th>
                    <th v-if="numberVisible" width="50">id</th>
                    <th :width="colum.width" v-for="(colum,index) of columns">
                        <div class="gulu-table-header">
                            {{colum.text}}
                            <span @click="changeOrderBy(colum.field)" class="gulu-table-sorter"
                                  v-if="colum.field in orderBy">
                                <g-icon :class="{active:orderBy[colum.field]=='asc'}" name="asc"></g-icon>
                                <g-icon :class="{active:orderBy[colum.field]=='desc'}" name="desc"></g-icon>
                            </span>
                        </div>
                    </th>
                </tr>
                </thead>
                <tbody>
                <template v-for="(data,index) of dataSource">
                    <tr >
                        <th  width="50" > <g-icon @click="expendItem(data.id)" class="gulu-table-expendIcon" name="right" v-if="data[expendProp]"></g-icon></th>
                        <td width="50"><input :checked="inSelectedItems(data)" @change="onChangeItem(data,$event)"
                                              type="checkbox"
                        ></td>
                        <td v-if="numberVisible" width="50">{{index+1}}</td>
                        <template v-for="(colum,index) of columns ">
                            <td :width="colum.width" v-if="colum.field === 'slot'" >
                                <slot :item="data" ></slot>
                            </td>
                            <td :width="colum.width" v-else >{{data[colum.field]}}</td>

                        </template>

                    </tr>
                    <tr v-if="isExpendedIds(data.id) && data[expendProp]">
                        <td></td>
                        <td :colspan="columns.length+1">
                            {{ data[expendProp] }}
                        </td>

                    </tr>
                </template>

                </tbody>
            </table>
            <div class="gulu-table-loading" v-if="loading">
                <g-icon name="loading"></g-icon>
            </div>
        </div>

    </div>
</template>

<script>
    import GIcon from '../icon/icon'
    export default {
        name: "Gulutable",
        components:{
            GIcon
        },
        props: {
            height: {
                type:String
            },
            loading: {
              type:Boolean,
              default: false
            },
            orderBy: {
                type: Object,
                default:()=>({})
            },
            columns: {
                type: Array,
                required: true
            },
            dataSource: {
                type: Array,
                required: true,
                validator(array){
                 return    !array.filter(item=>item.id==undefined).length>0
                }
            },
            numberVisible: {
                type: Boolean,
                default: false
            },
            bordered: {
                type: Boolean,
                default: false
            },
            striped:{
                type: Boolean,
                default: false
            },
            compact:{
                type:Boolean,
                default:false
            },
            selectedItems:{
                type:Array,
                default:()=>[]
            },
            expendProp:{
                type: String,
            }
        },
        data(){
            return {
                expendItems:[]
            }
        },
        watch:{
            selectedItems(value){
                if(value.length==0){
                    this.$refs.allChecked.indeterminate =false
                }else if(value.length==this.dataSource.length){
                    this.$refs.allChecked.indeterminate =false
                }
                else{
                    this.$refs.allChecked.indeterminate =true
                }
            }
        },
        computed:{
            areAllItemsSelected(){//由于使用了单向数据流，使用了深拷贝，所以不能只判断长度是否相等
                const a = this.dataSource.map(item=>item.id).sort();
                const b = this.selectedItems.map(item=>item.id).sort();
                let equal = true;
                if (a.length != b.length) {
                    equal = false;
                } else {
                    for (let i = 0; i < a.length; i++) {
                        if (a[i] != b[i]) {
                            equal = false
                            break
                        }
                    }
                }
                return    equal
            }

        },
        mounted (){
            let table2 = this.$refs.table.cloneNode(false)
            let { height } = this.$refs.table.children[0].getBoundingClientRect();
             this.$refs.table.style.marginTop = `${height}px`
            table2.appendChild(this.$refs.table.children[0])
            table2.classList.add('gulu-table-copy')
            this.table2 = table2
            Array.from(table2.children).map(node=>{
                if(node.tagName.toLowerCase()!='thead'){
                    node.remove()
                }
            })
            this.updateHeadersWidth();
            this.onWindowResize = ()=> this.updateHeadersWidth()
            window.addEventListener('resize', this.onWindowResize)
            console.log('wrapper',this.$refs.wrapper,'table2',table2);
            this.$refs.wrapper.appendChild(table2)
        },
        beforeDestroy(){
            window.removeEventListener('resize',this.onWindowResize)
            this.table2.remove();
        },
        methods:{
            isExpendedIds(id){
                return this.expendItems.indexOf(id)>-1
            },
            expendItem(id){
                if(this.isExpendedIds(id)){
                    this.expendItems.splice(this.expendItems.indexOf(id),1)
                }else{
                    this.expendItems.push(id)
                }

            },
            updateHeadersWidth(){
                Array.from(this.$refs.table.querySelector('tr').children).forEach((node,i)=>{
                    let { width } = node.getBoundingClientRect();
                    console.log(this.table2.querySelector('tr').children[i]);
                    this.table2.querySelector('tr').children[i].style.width = width+'px'
                })
            },
            changeOrderBy(key) {
                let oldvalue = this.orderBy[key];
                let newval = '';
                let oldobj = JSON.parse(JSON.stringify(this.orderBy));
                if (oldvalue === 'asc') {
                    newval = 'desc'
                } else if (oldvalue === 'desc') {
                    newval = true
                } else {
                    newval = 'asc'
                }
                oldobj[key] = newval;
                this.$emit('update:orderBy', oldobj)
            },
            inSelectedItems(data){
                return  this.selectedItems.filter(item=>item.id==data.id).length>0;
            },
            onChangeItem(item,e){
                let selected = e.target.checked;
                let copy = JSON.parse(JSON.stringify(this.selectedItems));
                if(selected){
                    copy.push(item)
                }else{
                    copy=  copy.filter((copyitem,index)=>copyitem.id!=item.id);
                }
                this.$emit('update:selectedItems',copy)
            },
            onChangeAllItems(e){
                this.$emit('update:selectedItems',e.target.checked?this.dataSource:[])
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "var";
    $gray: darken($gray, 10%);
    .gulu-table-wrapper{
        border: 1px solid $gray;
        border-left:0;
    }
    .gulu-table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        border-bottom: 1px solid $gray;

        &.bordered {
            border: 1px solid $gray;

            td, th {
                border: 1px solid $gray;
            }
        }

        &.compact {
            td, th {
                padding: 4px;
            }
        }

        td, th {
            border-bottom: 1px solid $gray;
            text-align: left;
            padding: 8px;
        }

        &.striped {
            tbody {
                > tr {
                    &:nth-child(odd) {
                        background: white;
                    }

                    &:nth-child(even) {
                        background: lighten($gray, 10%);
                    }
                }
            }
        }

        &-sorter {
            display: inline-flex;
            flex-direction: column;
            margin: 0 4px;
            cursor: pointer;

            svg {
                width: 10px;
                height: 10px;
                fill: $gray;

                &.active {
                    fill: red;
                }

                &:first-child {
                    position: relative;
                    bottom: -1px;
                }

                &:nth-child(2) {
                    position: relative;
                    top: -1px;
                }
            }
        }

        &-header {
            display: flex;
            align-items: center;
        }

        &-wrapper {
            position: relative;
            overflow: auto;
        }

        &-loading {
            background: rgba(255, 255, 255, 0.8);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            svg {
                @include spin
            }
        }

        &-copy {
            position: absolute;
            top: 0;
            left: 0;
            width: auto;
            background: white;
        }

        &-expendIcon {
            width: 10px;
            height: 10px;
        }

        & &-center {
            text-align: center;
        }
    }
</style>