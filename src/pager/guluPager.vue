<template>
    <div class="gulu-pager">
        <span @click="prev" class="gulu-pager-nav">
            <g-icon name="left"></g-icon>
        </span>
        <template v-for="(page,index) in pages">
            <template v-if="page==currentPage">
                <span class="gulu-pager-item current">{{page}}</span>
            </template>
            <template v-else-if="page==='...'"><span class="gulu-pager-separator">...</span></template>
            <a @click="pageChange(page)" class="gulu-pager-item" v-else>{{page}}</a>
        </template>
        <span @click="next" class="gulu-pager-nav">
            <g-icon name="right"></g-icon>
        </span>

    </div>
</template>

<script>
    import GIcon from '../icon/icon'

    export default {
        name: 'GuluPager',
        props: {
            totalPage: {
                type: Number,
                reqired: true
            },
            currentPage: {
                type: Number,
                required: true
            },
            hideIfOnePage: {
                type: Boolean,
                default: true
            }
        },
        components: {GIcon},
        computed: {
            pages() {
                return unique([1, this.currentPage,
                    this.currentPage - 1, this.currentPage + 1,
                    this.currentPage - 2, this.currentPage + 2,
                    this.totalPage]
                    .filter(item => item >= 1 && item <= this.totalPage)
                    .sort((a, b) => a - b))
                    .reduce((prev, next, index, arr) => {
                        if (arr[index + 1] != undefined && arr[index + 1] - arr[index] > 1) {
                            prev.push(next)
                            prev.push('...')
                        } else {
                            prev.push(next)
                        }
                        return prev
                    }, []);

            }
        },
        methods: {
            pageChange(page) {
                if (page >= 1 && page <= this.totalPage) {
                    this.$emit('update:currentPage', page)
                }
            },
            prev(){
                this.pageChange(this.currentPage-1)
            },
            next(){
                this.pageChange(this.currentPage+1)
            }
        }
    }

    function unique(arr) {
        return [...new Set(arr)]
        /*    let obj = {};
            arr.map(item=>{
                obj[item]=true
            });
            return Object.keys(obj)*/
    }
</script>
<style scoped lang='scss'>
    @import "var";

    .gulu-pager {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        user-select: none;
        $width: 20px;
        $height: 20px;
        $font-size: 12px;

        &.hide {
            display: none;
        }

        &-separator {
            width: $width;
            font-size: $font-size;
        }

        &-item {
            min-width: $width;
            height: $height;
            font-size: $font-size;
            border: 1px solid #e1e1e1;
            border-radius: $border-radius;
            padding: 0 4px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            margin: 0 4px;
            cursor: pointer;

            &.current, &:hover {
                border-color: $blue;
            }

            &.current {
                cursor: default;
            }
        }

        &-nav {
            margin: 0 4px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            background: $gray;
            height: $height;
            width: $width;
            border-radius: $border-radius;
            font-size: $font-size;
            cursor: pointer;

            &.disabled {
                cursor: default;

                svg {
                    fill: darken($gray, 30%);
                }
            }
        }
    }
</style>

