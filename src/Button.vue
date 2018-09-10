<template>
    <button class="g-button" :class="{[`icon-${iconPosition}`]:true}" @click="$emit('click')">
        <g-icon v-if="icon&&!loading" :name="icon"></g-icon>
        <g-icon v-if="loading" class="loading" name="loading"></g-icon>
        <div class="content">
            <slot></slot>
        </div>

    </button>

</template>

<script>
    import Vue from  'vue'
    import  Icon from './icon.vue'
    Vue.component('g-icon',Icon);
    export default{
        name:'',
        props: {
            icon: {},
            loading: {
                type: Boolean,
                default: false
            },
            iconPosition: {
                type: String,
                default: 'left',
                validator(value){
                    return value == 'left' || value == 'right';
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    $button-height: 32px;
    $button-bg: white;
    $button-active-bg: #eee;
    $font-size: 14px;
    $border-radius: 4px;
    $color: #999;
    $border-color:#d9d9d9;
    $border-color-hover: #666;
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .loading {
        width: 1em;
        height: 1em;
        animation: spin 2s infinite linear;
    }

    .g-button {
        vertical-align: middle;
        height: $button-height;
        font: inherit;
        border-radius: $border-radius;
        border: 1px solid $border-color;
        background: $button-bg;
        padding: 0 1em;
        display: inline-flex;
        justify-content: center;
        vertical-align: middle;
        align-items: center;
        padding: 0 1em;

    &:hover {
        border-color: $border-color-hover;
    }

    &:active {
        background: $button-active-bg;
    }

    &:focus {
        outline: none;
    }

    >.icon {
        order: 1;
        margin-right: .1em;
    }

    >.content {
        order: 2
    }
    }
    .g-button.icon-right {
    >.icon {
         order: 2;
         margin-right: 0;
         margin-left: .1em
     }

    >.content {
         order: 1
     }

    }
</style>