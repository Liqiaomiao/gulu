<template>
    <div class="collapse">
        <slot></slot>
    </div>
</template>


<script>
import Vue from "vue";
export default {
  name: "GuluCollapse",
  props: {
    single: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Array
    }
  },
  data() {
    return {
      eventBus: new Vue()
    };
  },
  provide() {
    return {
      eventBus: this.eventBus
    };
  },
  mounted() {
    this.eventBus.$emit("update:selected", this.selected);
    this.eventBus.$on("update:addselected", name => {
      let selectCopy = JSON.parse(JSON.stringify(this.selected));
      if (this.single) {
        selectCopy = [name];
      } else {
        selectCopy.push(name);
      }

      this.eventBus.$emit("update:selected", selectCopy);
      this.$emit("update:selected", selectCopy);
    });
    this.eventBus.$on("update:removeselected", name => {
      let index = this.selected.indexOf(name);
      let copySelected = JSON.parse(JSON.stringify(this.selected));
      copySelected.splice(index, 1);
      this.eventBus.$emit("update:selected", copySelected);
      this.$emit("update:selected", copySelected);
    });
  }
};
</script>
<style scoped lang="scss">
$gray: #ddd;
$border-radius: 4px;
.collapse {
  border: 1px solid $gray;
  border-radius: $border-radius;
}
</style>
