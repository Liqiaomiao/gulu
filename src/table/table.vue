<template>
    <div class="gulu-table-wrapper">
        {{selectedItems.length==dataSource.length}}
        <table :class="{bordered,striped,compact}" class="gulu-table">
            <thead>
                <tr>
                    <th><input :checked="selectedItems.length==dataSource.length" @change="onChangeAllItems" ref="allChecked" type="checkbox"></th>
                    <th v-if="numberVisible">id</th>
                    <th v-for="(colum,index) of columns">{{colum.text}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(data,index) of dataSource">
                    <td><input :checked="inSelectedItems(data)" @change="onChangeItem(data,$event)"
                               type="checkbox"
                    ></td>
                    <td v-if="numberVisible">{{index+1}}</td>
                    <template v-for="(colum,index) of columns ">
                        <td>{{data[colum.field]}}</td>
                    </template>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "Gulutable",
        props: {
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
        methods:{
            inSelectedItems(data){
                return  this.selectedItems.filter(item=>item.id==data.id).length>0;
            },
            onChangeItem(item,e){
                let copy = JSON.parse(JSON.stringify(this.selectedItems));
                if(e.target.checked){
                    copy.push(item)
                }else{
                  let i ;
                      copy.filter((copyitem,index)=>{
                       if(copyitem.id==item.id){
                          i = index
                       }
                    });
                    copy.splice(i,1)
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
        }

        &-copy {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
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