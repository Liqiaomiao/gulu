<template>
    <div class="g-nav">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "GuluNav",
        provide(){
            return {root:this}
        },
        props:{
            selected:{
                type:Array,
                default:()=>[]
            },
            multiple:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return {
               items:[],
               pathName:[]
            }
        },
        mounted (){
            this.updateChildren();
            this.items.forEach(vm=>{
                vm.$on('add:selected',(name)=>{

                    if(this.multiple){
                        let copy = JSON.parse(JSON.stringify(this.selected));
                        if(copy.indexOf(name)==-1){
                            copy.push(name)
                        }
                        this.$emit("update:selected",copy)
                    }else{
                        this.$emit("update:selected",[name])
                    }
                })
            })
        },
        updated(){
            this.updateChildren();
        },
        methods:{
            addItem(vm){
                this.items.push(vm);

            },
            updateChildren(){
                this.items.filter(vm=>{

                    if(this.selected.indexOf(vm.name)>-1){
                        vm.selected = true
                    }else{
                        vm.selected= false;
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
}
</style>