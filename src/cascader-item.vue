<template>
    <div class="cascaderItem" >
        <div class="left" >
            <div class="label" v-for="(items,index) in sourceItem" @click="onClickLabel(items)">
                {{items.name}}
                <Icon classname="icon-right" name="right" v-if="items.children"></Icon>
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
    .icon-right{
        width: 10px;
        height: 10px;
        fill: gray;
    }
  & > div {
    min-width: 60px;
  }
  .left {
      padding:10px;
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
    components:{
        Icon
    },
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
