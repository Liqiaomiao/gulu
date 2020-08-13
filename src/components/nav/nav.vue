<template>
    <div :class="{vertical}" class="g-nav">
        <slot></slot>
    </div>
</template>

<script>

    export default {
        name: "GuluNav",
        provide() {
            return {root: this}
        },

        props: {
            selected: {
                type: String
            },
            vertical: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                items: [],
                pathName: []
            }
        },
        mounted() {
            this.updateChildren();
            this.items.forEach(vm => {
                vm.$on('update:selected', (name) => {
                    this.$emit("update:selected", name)
                })
            })
        },
        updated() {
            this.updateChildren();
        },
        methods: {
            addItem(vm) {
                this.items.push(vm);

            },
            updateChildren() {
                this.items.filter(vm => {

                    if (this.selected==vm.name) {
                        vm.selected = true
                    } else {
                        vm.selected = false;
                    }

                })
            },

        }
    }
</script>

<style scoped lang="scss">
    @import "var";

    .g-nav {
        display: flex;
        border-bottom: 1px solid $gray;
        color: $color;
        cursor: default;
        user-select: none;

        &.vertical {
            flex-direction: column;
            border: 1px solid $gray;
        }
    }
</style>