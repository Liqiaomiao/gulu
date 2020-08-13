<style lang="scss" scoped>
.icon {
  height: 1em;
  width: 1em;
}
</style>
<template>
        <svg v-if="name" :class="['icon',classname]" @click="$emit('click',$event)">
            <use :xlink:href="`#i-${name}`"></use>
        </svg>

</template>

<script>
import "../../svg";
export default {
  props: {
      name:{
          type:String
      },
      classname:{
          type:String
      }
  }
};
</script>
