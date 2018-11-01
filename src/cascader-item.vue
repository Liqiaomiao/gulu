<template>
    <div class="cascaderItem" >
        <div class="left" >
            <div class="label" v-for="(items,index) in sourceItem" @click="onClickLabel(items)">
                {{items.name}} {{level}}
            </div>
        </div>
        <div class="right" v-if="rightItems&&rightItems.length>0"  >
            <cascader-item :sourceItem="rightItems" :level="level+1" :selected="selected" @update:selected="onChangeSelected">
        </cascader-item>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import "./var.scss";

.cascaderItem {
  display: flex;
  height: 100%;

  & > div {
    min-width: 160px;
  }
  .left {
  }
  .right {
    border-left: 1px solid $border-color-light;
  }
}
</style>
<script>
export default {
  name: "cascaderItem",
  props: {
    sourceItem: {
      type: Array
    },
      selected:{
        type:Array,
          default:()=>[]
      },
    level:{
        type:Number,
        default:()=>0
    }
  },
  data() {
    return {
    };
  },
  computed: {
    rightItems() {
        let currentSelected = this.selected[this.level];
        if (currentSelected&&currentSelected.children) {
        return currentSelected.children
      } else {
        return [];
      }
    }
  },
    methods:{
        onClickLabel(item){
            let copy=JSON.parse(JSON.stringify(this.selected));
            copy[this.level]=item;
            copy.splice(this.level+1);
            this.$emit('update:selected',copy);
        },
        onChangeSelected(copy){
            this.$emit('update:selected',copy)
        }
    }
};

</script>
