<template>
    <div class="gulu-pager">
        <span :class="{active:page===currentPage,separator:page=='...'}" class="gulu-pager-item"
              v-for="(page,index) in pages">{{page}}</span>
    </div>
</template>

<script>
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
        data() {
            let pages =
                unique([1, this.currentPage,
                    this.currentPage - 1, this.currentPage + 1,
                    this.currentPage - 2, this.currentPage + 2,
                    this.totalPage]
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
            return {
                pages
            }
        },
        mounted() {

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
        &-item {
            border:1px solid #e1e1e1;
            border-radius: $border-radius;
            padding: 0 4px;
            min-width:20px;
            height: 20px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            margin: 0 4px;
            &.active,&:hover{
                border-color: #4a90e2;

            }
            &.active,&.separator{cursor: default}
            &.separator{border: none}
        }
    }
</style>

