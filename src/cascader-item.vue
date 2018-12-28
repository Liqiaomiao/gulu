<template>
    <div class="cascaderItem" >
        <div class="left" >
            <div @click="onClickLabel(items)" class="label" v-for="(items,index) in sourceItem">
                <span class="name">
                    {{items.name}}
                </span>
                <template  v-if="loading.name==items.name&&!items.isLeaf && !rightItems" >
                    <Icon classname="icon-loading" name="loading"></Icon>
                </template>
                <template v-else>
                    <Icon  classname="icon-right" name="right" v-if="arrowVisible(items)"></Icon>
                </template>

            </div>
        </div>
        <div class="right" v-if="rightItems&&rightItems.length>0"  >
            <cascader-item :level="level+1" :load-data="loadData" :loading="loading" :selected="selected"   :sourceItem="rightItems" @update:selected="onChangeSelected">
        </cascader-item>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import "./var.scss";
.cascaderItem {
  display: flex;
  height: 100%;
    .icon-right{
        width: 10px;
        height: 10px;
        fill: gray;
    }
  & > div {
    min-width: 60px;
  }
  .left {
      overflow: auto;
      padding:.3em 0;
      height:100%;
      .label{
          padding: .5rem 1em;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor:pointer;
        &:hover{
            background: $gray;
         }
            .name{
                margin-right: 1em;
            }
          .icon{
              margin-left: auto;
              transform: scale(.8);
          }
          .icon-loading{
              animation: spin 2s infinite linear;
          }
      }
  }
  .right {
    border-left: 1px solid $border-color-light;
  }
}
</style>
<script>
    import Icon from "./icon.vue";
    export default {
        name: "cascaderItem",
        components: {
            Icon
        },
        props: {
            loading: {
                type: Object,
                default: () => ({})
            },
            sourceItem: {
                type: Array
            },
            selected: {
                type: Array,
                default: () => []
            },
            level: {
                type: Number,
                default: () => 0
            },
            loadData: {
                type: Function
            }
        },
        data() {
            return {};
        },
        computed: {
            rightItems() {
                if (this.selected[this.level]) {
                    let right = this.sourceItem.filter(item => {
                        return item.name == this.selected[this.level].name
                    })[0];
                    if (right && right.children && right.children.length > 0) {
                        return right.children
                    }
                }

            }
        },
        updated(){
        },
        methods: {
            onClickLabel(item){
                let copy = JSON.parse(JSON.stringify(this.selected));
                copy[this.level] = item;
                copy.splice(this.level + 1);//移除后面的项，重新选择城市能够实时更新子集
                this.$emit('update:selected', copy);
            },
            onChangeSelected(copy){
                this.$emit('update:selected', copy)
            },
            arrowVisible(items){
                Boolean(this.loadData)
                return this.loadData ? !items.isLeaf : items.children
            }
        }
    };

</script>
