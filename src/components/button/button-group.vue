<template>
    <div class="g-button-group">
        <slot></slot>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    for (let node of this.$el.children) {
      let name = node.nodeName.toLowerCase();
      if (name != "button") {
        console.warn(
          `g-button-group 的子元素应该全是g-button,但是你写的是${name}`
        );
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.g-button-group {
  display: inline-flex;
  vertical-align: middle;
  & > button {
    margin-left: -1px;
    border-radius: 0;
    &:hover {
      border: 1px solid var(--border-color-hover);
      position: relative;
      z-index: 1;
      transition: 1s;
    }
  }
  & > button:first-child {
    border-top-left-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
    margin-left: 0;
  }
  & > button:last-child {
    border-top-right-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
  }
}
</style>
