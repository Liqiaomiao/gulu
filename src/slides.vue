<template>
    <div class="g-slides">
        <div class="g-slides-window">
            <div class="g-slides-wrapper">
                <slot></slot>
            </div>

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
        mounted(){
            this.updateChildren();
            this.playAutomatically();
        },
        updated() {
            this.updateChildren()

        },
        methods:{
            playAutomatically(){
                const names = this.getNames();

                let run = ()=>{
                    let index = names.indexOf(this.getSelected());
                    let nameIndex= index+1;
                    if(nameIndex===names.length){nameIndex=0}
                    // let nameIndex= index-1;
                    // if(nameIndex===-1){nameIndex=names.length-1}

                    this.$emit('update:selected',names[nameIndex]);
                    setTimeout(run,3000)
                };
                setTimeout(run,3000);
            },
            getSelected(){
                let first =this.$children[0];
               return  this.selected||first.name
            },
            getNames(){
               return   this.$children.map(item=> item.name);
            },
            updateChildren(){
                let selected = this.getSelected();
                let names = this.getNames();
                this.$children.forEach(vm=>{
                    vm.selected=selected;
                    let newIndex = names.indexOf(selected);
                    let oldIndex = names.indexOf(vm.name);
                    vm.reverse =  newIndex > oldIndex?false:true;
                })
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
}
</style>