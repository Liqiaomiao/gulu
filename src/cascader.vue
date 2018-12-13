<template>
    <div class="cascader" ref="cascader" v-click-outside="close">
        <div class="trigger" @click="toggle">
            {{result||"&nbsp;"}}
        </div>
        <div class="popover-wraper" v-if="popoverVisible" :style="{height:gheight}">
            <cascader-item :sourceItem="source" :selected="selected"   :load-data="loadData"
                           @update:selected="onChangeSelected" ></cascader-item>
        </div>
    </div>
</template>

<script>
    import cascaderItem from "./cascader-item.vue";
    import clickOutside from './click-outside'
    import removeListener from './click-outside'
    export default {
        name: "GuluCascader",
        components: {
            cascaderItem
        },
        directives:{
            clickOutside
        },
        props: {
            source: {
                type: Array
            },
            gheight: {
                type: String
            },
            selected: {
                type: Array,
                default: () => []
            },
            loadData: {
                type: Function
            }
        },
        data() {
            return {
                popoverVisible: false,
                level1Selected: null,
                level2Selected: null
            };
        },
        computed: {
            level2Items() {
                if (this.level1Selected) {
                    return this.level1Selected.children;
                } else {
                    return [];
                }
            },
            result(){
                return this.selected.map(item => {
                    return item.name
                }).join("/")
            }
        },
        created(){
            removeListener();
        },
        methods: {
            onChangeSelected(copy){
                this.$emit('update:selected', copy);
                let lastItem = copy[copy.length - 1];//被选中的项
                console.log('lastItem', lastItem);
                let simplest = (children, id) => {
                    return children.filter(item => {
                        return item.id === id
                    })[0]
                };
                let complex = (children, id) => {
                    let nochildren = [];
                    let haschildren = [];
                    children.forEach(item => {
                        if (item && item.children && item.children.length > 0) {
                            haschildren.push(item)
                        } else {
                            nochildren.push(item)
                        }
                    });

                    let found = simplest(nochildren, id);

                    if (found) {
                        return found
                    } else {

                        found = simplest(haschildren, id);
                        console.log('found', found);
                        if (found) {
                            return found
                        } else {
                            for (let i = 0; i < haschildren.length; i++) {

                                found = complex(haschildren[i].children, id);
                                if (found) {
                                    return found
                                }
                            }
                            return undefined
                        }


                    }


                };
                let updateSourcce = (result) => {
                    //掉回调的时候传一个函数，这个函数理论上应该会被调用
                    //result 被选中的项子集 ,但是不能通过lastItem.children=result;更改数据
                    //通过数据源找到匹配的值
                    let deepcopy = JSON.parse(JSON.stringify(this.source));
                    let toUpdate = complex(deepcopy, lastItem.id);
                    if (toUpdate) {

                        toUpdate.children = result;
                    }

                    this.$emit('update:source', deepcopy)


                };
                console.log(lastItem.isLeaf);
                if(!lastItem.ifLeaf){
                  this.loadData &&  this.loadData(lastItem, updateSourcce)
                }
            },
            onClickDocument({target}){
                let {cascader}=this.$refs;
                if(target==cascader || cascader.contains(target)){
                    return
                }
                this.close()
            },
            open(){
                this.popoverVisible=true;
//                this.$nextTick(()=>{
//                    document.addEventListener('click',this.onClickDocument)
//                })
            },
            close(){
                this.popoverVisible=false;
//                document.removeEventListener('click',this.onClickDocument)
            },
            toggle(){
                if(this.popoverVisible){
                    this.close()
                }else {
                    this.open()
                }
            }
        }


    };
</script>
<style lang="scss" scoped>
@import "var.scss";
.cascader {
    display:inline-block;
  .trigger {
    border: 1px solid $border-color;
    height: 30px;
    border-radius: $border-radius;
      display: inline-flex;
      min-width: 10em;
      align-items: center;
      padding: 1em;
  }
  .popover-wraper {
    position: absolute;
    height: 150px;
    display: flex;
    @extend .box-shadow;
      margin-top: 10px;
  }
}
</style>
