<template>
    <div class="wrapper" :class="{error}">
        <input type="text"
               :value="value"
               :disabled="disabled"
               :readonly="readonly"
               @change="$emit('change',$event.target.value)"
               @input="$emit('input',$event.target.value)"
               @blur="$emit('blur',$event.target.value)"
               @focus="$emit('focus',$event.target.value)"
        />
        <template v-if="error">
            <Icon   name="error" class="icon-error"></Icon>
            <span   class='errorMessage'>{{error}}</span>
        </template>

    </div>
</template>

<script>
import Icon from "./icon/icon.vue";
export default {
  name: "GuluInput",
  data() {
    return {};
  },
  components: {
    Icon
  },
  props: {
    value: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    error: {
      type: String
    }
  }
};
</script>
<style scoped lang="scss" type="text/scss">
@import "var.scss";
.wrapper {
  display: inline-flex;
  align-items: center;
  > :not(:last-child) {
    margin-right: 0.5rem;
  }

  &.error {
    > input {
      border-color: $red;
    }
    .icon-error {
      fill: $red;
    }
    .errorMessage {
      color: $red;
    }
  }
  > input {
    height: $input-height;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    padding: 0 8px;
    font-size: $font-size;
    &:hover {
      border-color: $borer-color-hover;
    }
    &:focus {
      box-shadow: inset 0 1px 3px $box-shadow-color;
      outline: none;
    }
    &[disabled],
    &[readonly] {
      border-color: #bbb;
      color: #ccc;
      cursor: not-allowed;
    }
  }
}
</style>
