<template>
    <div :class="{active}" class="g-sub-nav" v-click-outside="close">
       <span @click="open=!open" class="g-sub-nav-label">
           <slot name="title"></slot>
           <g-icon :class="{open}" class="g-sub-nav-icon" name="right"></g-icon>
       </span>
        <template v-if="vertical">
            <transition @enter="enter" @leave="leave" v-on:after-enter="afterEnter">
                <div class="g-sub-nav-popover" v-show="open">
                    <slot></slot>
                </div>
            </transition>
        </template>
        <template v-else>
            <div class="g-sub-nav-popover" v-show="open">
                <slot></slot>
            </div>
        </template>
    </div>
</template>

<script>
    import clickOutside from '../click-outside'
    import {removeListener} from '../click-outside'
    import GIcon from '../icon/icon'

    export default {
        name: "GuluSubNav",
        inject: ['root'],
        components: {
            GIcon
        },
        props: {
            name: {
                type: String,
                required: true
            }
        },
        directives: {
            clickOutside
        },
        data() {
            return {
                open: false,

            }
        },
        computed: {
            active() {
                return this.root.pathName.indexOf(this.name) > -1 ? true : false
            },
            vertical(){
                return this.root.vertical
            }
        },
        methods: {
            afterEnter(el) {
                el.style.height = 'auto';
            },
            enter(el, done) {
                el.style.height = 'auto';
                let {height} = el.getBoundingClientRect();
                el.style.height = 0;
                el.getBoundingClientRect();//必须算出高度才能进行的操作
                el.style.height = `${height}px`;
                el.addEventListener('transitionend', () => {
                    done()
                })
            },
            leave(el, done) {
                let {height} = el.getBoundingClientRect();
                el.style.height = `${height}px`;
                el.getBoundingClientRect();
                el.style.height = 0;
                el.addEventListener('transitionend', () => {
                    done()
                })
            },
            updatePathName() {
                this.root.pathName.unshift(this.name);
                this.$parent.updatePathName && this.$parent.updatePathName();

            },
            close() {
                this.open = false;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "var";

    .g-sub-nav {
        position: relative;

        &.active {
            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                border-bottom: 2px solid $blue;
                width: 100%;
            }
        }

        &-label {
            padding: 10px 20px;
            display: block;
        }

        &-icon {
            display: none;
        }

        &-popover {
            background: white;
            position: absolute;
            top: 100%;
            left: 0;
            margin-top: 4px;
            white-space: nowrap;
            box-shadow: 0 0 3px fade_out(black, 0.8);
            border-radius: $border-radius;
            font-size: $font-size;
            color: $light-color;
            min-width: 8em;
            transition: all 1s;


        }
    }

    .g-sub-nav .g-sub-nav {
        &.active {
            &::after {
                display: none;
            }
        }

        .g-sub-nav-popover {
            top: 0;
            left: 100%;
            margin-left: 8px;

        }

        .g-sub-nav-label {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .g-sub-nav-icon {
            transition: transform 250ms;
            display: inline-flex;
            margin-left: 1em;

            svg {
                fill: $light-color;
            }

            &.open {
                transform: rotate(180deg);
            }
        }
    }

    .vertical .g-sub-nav-popover {
        position: static;
        left: 0 !important;
        top: 0;
        border-radius: 0;
        box-shadow: none;
        overflow: hidden;
    }

    .slide-enter-active, .slide-leave-active {
        transition: all 1s;
    }

    .slide-enter, .slide-leave-to {
        opacity: 0;
    }
</style>