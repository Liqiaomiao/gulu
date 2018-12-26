<template>
    <div class="g-slides">
        <div class="g-slides-window">
            <div class="g-slides-wrapper">
                <slot></slot>
            </div>

        </div>
        <div class="g-slides-dots">
            <span :class="{active:n-1==names.indexOf(selected)}" @click="select(n-1)"
            v-for="n in childrenLength ">{{n}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "slides",
        props:{
            selected:{
                type:String
            },
            autoPlay:{
                type:Boolean,
                default:true
            }
        },
        data(){
            return{
                childrenLength:0,
                lastSelectedIndex:0
            }
        },
        computed:{
            selectedIndex(){
                return this.names.indexOf(this.selected)
            },
            names(){
                return   this.$children.map(item=> item.name);
            }
        },
        mounted(){
            this.updateChildren();
            this.playAutomatically();
            this.childrenLength=this.$children.length;
            this.lastSelectedIndex=this.names.indexOf(this.selected);
        },
        updated() {
            this.updateChildren()

        },
        methods:{
            playAutomatically(){
                const names = this.names;
                let run = ()=>{
                    let index = names.indexOf(this.getSelected());
                    let nameIndex= index+1;
                    if(nameIndex===names.length){nameIndex=0}
                    // let nameIndex= index-1;
                    // if(nameIndex===-1){nameIndex=names.length-1}

                    this.$emit('update:selected',names[nameIndex]);
                    setTimeout(run,3000)
                };
               // setTimeout(run,3000);
            },
            getSelected(){
                let first =this.$children[0];
               return  this.selected||first.name
            },
            updateChildren(){
                let selected = this.getSelected();
                let names = this.names;
                this.$children.forEach(vm=>{
                    vm.selected=selected;
                    let newIndex = names.indexOf(selected);
                    let oldIndex = names.indexOf(vm.name);
                    vm.reverse =  this.lastSelectedIndex < this.selectedIndex?false:true;
                })


            },
            select(val){
                this.$emit('update:selected',this.names[val]);
                this.lastSelectedIndex=this.selectedIndex;
            }
        }
    }
</script>

<style scoped lang="scss">
.g-slides{
    border: 1px solid #000;
    &-window{
        display: flex;
        overflow: hidden;
    }
    &-wrapper{ position: relative;width: 100%;}
    &-dots{
        .active{background: red;}
    }
}
</style>